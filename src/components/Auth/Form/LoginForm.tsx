"use client";

import { Button, Form, Input, Space, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthServerMutation } from "@/hooks/useMutation";

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
    <Form onFinish={trigger} disabled={isMutating} size="large">
      <Space direction="vertical" size="middle">
        <Form.Item noStyle name="username">
          <Input
            required
            type="text"
            placeholder="Enter Username"
            addonBefore={<UserOutlined />}
            autoFocus
          />
        </Form.Item>
        <Form.Item noStyle name="password">
          <Input.Password
            required
            placeholder="Enter Password"
            addonBefore={<LockOutlined />}
          />
        </Form.Item>
        <Typography.Paragraph type="secondary">
          By signing up you agree to ethan terms of service and{" "}
          <Typography.Link
            href="https://www.ethan-ai.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="hover:underline focus:underline"
          >
            privacy policy
          </Typography.Link>
          . You also agree to receive subsequent email and third-party
          communications, which you may opt out of at any time.
        </Typography.Paragraph>
        <Space
          direction="vertical"
          size="small"
          align="center"
          className="w-full"
        >
          <Button
            htmlType="submit"
            type="primary"
            loading={isMutating}
            className="px-10"
          >
            Log In
          </Button>
          <Typography.Text type="secondary">
            Not a member?{" "}
            <Link href="/signup" className="hover:underline focus:underline">
              Sign up
            </Link>
          </Typography.Text>
          <Link
            href="/forgot-password"
            className="hover:underline focus:underline"
          >
            Forgot Password?
          </Link>
        </Space>
      </Space>
    </Form>
  );
}