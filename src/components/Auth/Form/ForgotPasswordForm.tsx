"use client";

import { Button, Form, FormRule, Input } from "antd";
import { useRouter } from "next/navigation";
import { useAuthServerMutation } from "@/hooks/useMutation";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { ILoginResponse, IUserArgs } from "@/interfaces/Auth";

const FormRules: Record<keyof IUserArgs, FormRule[]> = {
  username: [{ required: true, message: "Please enter your username" }],
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { trigger, isMutating } = useAuthServerMutation<
    IUserArgs,
    ILoginResponse
  >("/forgot-password", {
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
  });

  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={trigger}
      size="large"
      disabled={isMutating}
      layout="vertical"
      className="space-y-10"
      labelCol={{ className: "font-medium" }}
    >
      <Form.Item label="Username" name="username" rules={FormRules.username}>
        <Input type="text" placeholder="Enter Username" autoFocus />
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
