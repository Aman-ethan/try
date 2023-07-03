"use client";

import useUpdatePassword from "@/hooks/useUpdatePassword";
import { Button, Form, Input, Progress } from "antd";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { form, trigger, isMutating, helpText, progress } = useUpdatePassword({
    onSuccess(data) {
      if (data) {
        router.replace("/reset-success");
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
    >
      <Form.Item name="new_password" label="New Password" help={helpText}>
        <Input.Password
          status={helpText ? "warning" : undefined}
          required
          placeholder="••••••••"
          autoFocus
        />
      </Form.Item>
      <Form.Item label="Password Strength">
        <Progress steps={4} showInfo={false} {...progress} />
      </Form.Item>
      <Button htmlType="submit" type="primary" loading={isMutating} block>
        Change Password
      </Button>
    </Form>
  );
}
