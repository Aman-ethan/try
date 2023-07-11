"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { ILoginResponse, IUserArgs } from "@/interfaces/Auth";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { trigger, isMutating } = useAuthServerMutation<
    IUserArgs,
    ILoginResponse
  >("/forgot-password/", {
    onSuccess(data) {
      if (data.user_id) {
        router.push(
          `/verify-otp${buildURLSearchParams({
            username: form.getFieldValue("username"),
            phone_number: data.phone_number,
            user_id: data.user_id.toString(),
            next_path: "/reset-password",
          })}`
        );
      }
    },
    onError() {
      message.error("Credentials are incorrect. Please try again.");
    },
  });

  return (
    <Form
      form={form}
      onFinish={trigger}
      size="large"
      disabled={isMutating}
      layout="vertical"
      className="space-y-10"
      labelCol={{ className: "font-medium" }}
    >
      <Form.Item label="Username" name="username">
        <Input placeholder="Enter your username" required />
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
