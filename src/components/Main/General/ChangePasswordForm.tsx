"use client";

import useChangePassword from "@/hooks/useChangePassword";
import { Button, Form, FormRule, Input, Row, message } from "antd";

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
        message.success("Password changed successfully");
      }
    },
  });

  const getStatus = (fieldName: keyof IChangePasswordForm) =>
    form.getFieldError(fieldName).length > 0 ? "warning" : undefined;

  return (
    <Form
      form={form}
      onFinish={trigger}
      requiredMark={false}
      disabled={isMutating}
      size="large"
      layout="vertical"
      className="mt-4 space-y-8"
    >
      <Form.Item
        label="Old Password"
        name="old_password"
        rules={FormRules.old_password}
      >
        <Input.Password status={getStatus("old_password")} />
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
        <Input.Password status={getStatus("confirm_password")} />
      </Form.Item>

      <Row className="gap-x-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={isMutating}
          className="px-7"
        >
          Submit
        </Button>
        <Button htmlType="reset" disabled={isMutating} className="px-7">
          Cancel
        </Button>
      </Row>
    </Form>
  );
}
