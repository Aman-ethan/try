"use client";

import { Button, Form, FormRule, Input, Progress } from "antd";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import { AccessTokenKey } from "@/constants/strings";

const FormRules: Record<"new_password", FormRule[]> = {
  new_password: [{ required: true, message: "Please enter your new password" }],
};

export default function ResetPasswordForm() {
  const removeCookie = useCookies([AccessTokenKey])[2];
  const router = useRouter();
  const { form, trigger, isMutating, helpText, progressProps } =
    useUpdatePassword({
      onSuccess(data) {
        if (data) {
          router.replace("/reset-success");
          removeCookie(AccessTokenKey);
        }
      },
    });
  return (
    <Form
      form={form}
      size="large"
      onFinish={trigger}
      disabled={isMutating}
      className="space-y-10"
      layout="vertical"
      labelCol={{ className: "font-medium" }}
      requiredMark={false}
    >
      <div className="space-y-6">
        <Form.Item
          name="new_password"
          label="New Password"
          help={helpText}
          rules={FormRules.new_password}
        >
          <Input.Password
            status={helpText ? "warning" : undefined}
            placeholder="••••••••"
            autoFocus
          />
        </Form.Item>
        <Form.Item label="Password Strength">
          <Progress steps={4} showInfo={false} {...progressProps} />
        </Form.Item>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        loading={isMutating}
        block
        className="mt-8 tab:mt-10"
      >
        Change Password
      </Button>
    </Form>
  );
}
