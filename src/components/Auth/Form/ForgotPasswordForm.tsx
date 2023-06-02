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
    <Form onFinish={trigger} size="large" disabled={isMutating}>
      <Space direction="vertical" size="large" className="w-full">
        <Form.Item noStyle name="username">
          <Input
            required
            type="text"
            placeholder="Enter Username or Email ID"
            addonBefore={<UserOutlined />}
            autoFocus
          />
        </Form.Item>
        <Space direction="vertical" align="center" className="w-full pt-6">
          <Button
            htmlType="submit"
            type="primary"
            loading={isMutating}
            className="px-10"
          >
            Submit
          </Button>
          <Typography.Text type="secondary">
            Try Login Again?{" "}
            <Link href="/login" className="hover:underline focus:underline">
              Log In
            </Link>
          </Typography.Text>
        </Space>
      </Space>
    </Form>
  );
}
