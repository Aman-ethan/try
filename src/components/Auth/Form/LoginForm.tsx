"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import { ILoginArgs, ILoginResponse } from "@/interfaces/Auth";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { trigger, isMutating } = useAuthServerMutation<
    ILoginArgs,
    ILoginResponse
  >("/login/", {
    onSuccess(data) {
      if (data.user_id) {
        router.push(
          `/verify-otp${buildURLSearchParams({
            user_id: data.user_id.toString(),
            phone_number: data.phone_number,
            username: form.getFieldValue("username"),
            password: btoa(form.getFieldValue("password")),
          })}`
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
      form={form}
      disabled={isMutating}
      size="large"
      layout="vertical"
      className="space-y-10"
      labelCol={{ className: "font-medium" }}
    >
      <div className="space-y-6">
        <Form.Item label="Username" name="username">
          <Input required type="text" placeholder="Enter Username" autoFocus />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password required placeholder="Enter Password" />
        </Form.Item>
      </div>
      <Button htmlType="submit" type="primary" block loading={isMutating}>
        Login
      </Button>
    </Form>
  );
}
