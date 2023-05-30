"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { message } from "antd";

interface IVerifyResponse {
  access_token: string;
  refresh_token: string;
}

interface IVerifyArgs {
  userId: string;
  otp: string;
}

async function verify(key: string, { arg }: Readonly<{ arg: IVerifyArgs }>) {
  const res = await fetch(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + key, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...arg, user_id: arg.userId }),
  });

  if (!res.ok) {
    message.error("OTP is incorrect. Please try again.");
  }
}

const OPT_LENGTH = 6;

export default function VerifyPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IVerifyArgs>();
  const { trigger, isMutating } = useSWRMutation<
    IVerifyResponse | void,
    Error,
    string,
    IVerifyArgs
  >("/api/verify-otp", verify, {
    onSuccess(data) {
      if (data?.access_token && data.refresh_token) {
        router.push("/dashboard");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit((data) => trigger(data))}>
      <h1>Verify Page</h1>
    </form>
  );
}
