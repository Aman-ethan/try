"use client";

import { Button, Form, FormRule, Input, message } from "antd";
import { useRouter } from "next/navigation";
import useChangePassword from "@/hooks/useChangePassword";

interface IChangePasswordForm {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const FormRules: Partial<Record<keyof IChangePasswordForm, FormRule[]>> = {
  old_password: [
    { required: true, message: "Please input your old password!" },
  ],
  new_password: [
    { required: true, message: "Please input your new password!" },
  ],
  confirm_password: [
    {
      required: true,
      message: "Please input your confirm password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("new_password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("The new password doesn't match the confirm password")
        );
      },
    }),
  ],
};

export default function ChangePasswordForm() {
  const { form, helpText, isMutating, trigger } = useChangePassword({
    onSuccess(data) {
      if (data) {
        form.resetFields();
        message.success("Password changed successfully");
      }
    },
  });

  const router = useRouter();

  return (
    <Form
      form={form}
      onFinish={trigger}
      requiredMark={false}
      disabled={isMutating}
      size="large"
      layout="vertical"
      className="flex h-[calc(100vh-15.5rem)] flex-col justify-between gap-y-10 mob:justify-start"
    >
      <div className="flex flex-col gap-y-8">
        <Form.Item
          label="Old Password"
          name="old_password"
          rules={FormRules.old_password}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="new_password"
          rules={FormRules.new_password}
          help={helpText}
        >
          <Input.Password status={helpText ? "warning" : undefined} />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirm_new_password"
          dependencies={["new_password"]}
          hasFeedback
          rules={FormRules.confirm_password}
        >
          <Input.Password />
        </Form.Item>
      </div>

      <div className="flex flex-col gap-x-4 gap-y-4 mob:flex-row tab:flex-row lap:justify-end">
        <Button
          onClick={router.back}
          disabled={isMutating}
          className="px-6 mob:order-last tab:order-last lap:order-none"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isMutating}
          className="px-6"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
