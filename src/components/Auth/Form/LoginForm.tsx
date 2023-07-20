"use client";

import { cookieOptions } from "@/constants/cookie";
import { useAuthServerMutation } from "@/hooks/useMutation";
import { ILoginArgs, ILoginResponse } from "@/interfaces/Auth";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Button, Form, FormRule, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

const FormRules: Record<keyof ILoginArgs, FormRule[]> = {
  username: [{ required: true, message: "Please enter your username" }],
  password: [{ required: true, message: "Please enter your password" }],
};

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { trigger, isMutating } = useAuthServerMutation<
    ILoginArgs,
    ILoginResponse
  >("/login", {
    onSuccess(data) {
      if (data.user_id) {
        router.push(
          `/verify-otp${buildURLSearchParams({
            user_id: data.user_id.toString(),
            phone_number: data.phone_number,
            username: form.getFieldValue("username"),
          })}`
        );
        new Cookies().set(
          "password",
          btoa(form.getFieldValue("password")),
          cookieOptions
        );
      }
    },
    onError(error) {
      message.error(error.message);
    },
  });

  return (
    <Form
      onFinish={trigger}
      requiredMark={false}
      form={form}
      disabled={isMutating}
      size="large"
      layout="vertical"
      className="space-y-10"
      labelCol={{ className: "font-medium" }}
    >
      <div className="space-y-6">
        <Form.Item label="Username" name="username" rules={FormRules.username}>
          <Input type="text" placeholder="Enter Username" autoFocus />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={FormRules.password}>
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
      </div>
      <Button htmlType="submit" type="primary" block loading={isMutating}>
        Login
      </Button>
    </Form>
  );
}
