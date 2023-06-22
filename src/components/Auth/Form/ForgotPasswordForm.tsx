"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import PhoneInput from "../../Input/PhoneInput";
import buildURLSearchParams from "@/lib/buildURLSearchParams";

interface IUserArgs {
  username: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { trigger, isMutating } = useAuthServerMutation<
    IUserArgs,
    ILoginResponse
  >("/api/forgot-password", {
    onSuccess(data) {
      if (data.user_id) {
        router.push(
          "/verify-otp" +
            buildURLSearchParams({
              phone_number: data.phone_number,
              user_id: data.user_id.toString(),
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
      <PhoneInput />
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
