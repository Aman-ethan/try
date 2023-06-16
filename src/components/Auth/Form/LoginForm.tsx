"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

interface ILoginArgs {
  username: string;
  password: string;
}

interface ILoginResponse {
  user_id: string;
  message?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { trigger, isMutating } = useAuthServerMutation<
    ILoginArgs,
    ILoginResponse
  >("/api/login", {
    onSuccess(data) {
      if (data.user_id) {
        router.push(
          "/verify-otp?" + new URLSearchParams({ user_id: data.user_id })
        );
      }
    },
    onError() {
      message.error("Login credentials are incorrect. Please try again.");
    },
  });

  return (
    <Form
      onFinish={trigger}
      disabled={isMutating}
      size="large"
      layout="vertical"
      className="space-y-10"
    >
      <div className="space-y-6">
        <Form.Item label="Username" name="username" className="font-medium">
          <Input required type="text" placeholder="Enter Username" autoFocus />
        </Form.Item>
        <Form.Item label="Password" name="password" className="font-medium">
          <Input.Password required placeholder="Enter Password" />
        </Form.Item>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        block
        loading={isMutating}
      >
        Login
      </Button>
    </Form>
  );
}
