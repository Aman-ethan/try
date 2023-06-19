"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IUserArgs {
  username: string;
}

interface IUserResponse {
  user_id: string;
  message: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { trigger, isMutating } = useAuthServerMutation<
    IUserArgs,
    IUserResponse
  >("/api/forgot-password", {
    onSuccess(data) {
      if (data.user_id) {
        router.push(
          "/verify-otp?" +
            new URLSearchParams({
              user_id: data.user_id,
              next_path: "/reset-password",
            })
        );
      }
    },
    onError() {
      message.error("Credentials are incorrect. Please try again.");
    },
  });

  return (
    <Form
      onFinish={trigger}
      size="large"
      disabled={isMutating}
      layout="vertical"
      className="space-y-10"
      labelCol={{ className: "font-medium" }}
    >
      <Form.Item label="Phone Number" name="username">
        <Input required type="text" placeholder="1234-56789" autoFocus />
      </Form.Item>
      <Button
        htmlType="submit"
        type="primary"
        loading={isMutating}
        className="px-10"
        block
      >
        Submit
      </Button>
    </Form>
  );
}
