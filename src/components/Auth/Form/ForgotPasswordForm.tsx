"use client";

import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

interface IUserArgs {
  username: string;
}

interface IUserResponse {
  user_id: string;
  message?: string;
}

async function user(key: string, { arg }: Readonly<{ arg: IUserArgs }>) {
  const res = await fetch(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + key, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    message.error("Credentials are incorrect. Please try again.");
  } else {
    return res.json();
  }
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation<
    IUserResponse,
    Error,
    string,
    IUserArgs
  >("/api/forgot-password", user, {
    onSuccess(data) {
      if (data?.user_id) {
        delete data.message;
        router.push(
          "/verify-otp?" +
            new URLSearchParams({ ...data, next_path: "/reset-password" })
        );
      }
    },
  });
  return (
    <Form onFinish={(data) => trigger(data)} size="large" disabled={isMutating}>
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
            <Link href="/login" className="hover:underline">
              Log In
            </Link>
          </Typography.Text>
        </Space>
      </Space>
    </Form>
  );
}
