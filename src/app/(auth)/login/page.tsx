"use client";

import useSWRMutation from "swr/mutation";
import { message } from "antd";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/Auth/Input";
import Link from "next/link";
import Button from "@/components/Auth/Button";
import { useForm } from "react-hook-form";

interface ILoginArgs {
  username: string;
  password: string;
}

interface ILoginResponse {
  user_id: string;
}

async function login(key: string, { arg }: Readonly<{ arg: ILoginArgs }>) {
  const res = await fetch(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + key, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    message.error("Login credentials are incorrect. Please try again.");
  } else {
    return res.json();
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILoginArgs>();

  const { trigger, isMutating } = useSWRMutation<
    ILoginResponse | void,
    Error,
    string,
    ILoginArgs
  >("/api/login", login, {
    onSuccess(data) {
      if (data?.user_id) {
        router.push("/verify?userId=" + data.user_id);
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => trigger(data))}
      className="flex flex-col space-y-12"
    >
      <p className="text-[#727272] text-2xl">Please enter your credentials</p>
      <div className="space-y-8">
        <AuthInput
          required
          type="text"
          placeholder="Enter Username"
          disabled={isMutating}
          {...register("username", { required: true })}
        />
        <div className="space-y-2">
          <AuthInput
            type="password"
            placeholder="Enter Password"
            disabled={isMutating}
            {...register("password", { required: true })}
          />
          <p className="text-xs text-[#6d6b6b]">
            By signing up you agree to ethan terms of service and{" "}
            <a
              href="https://www.ethan-ai.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-auth-blue hover:underline"
            >
              privacy policy
            </a>
            . You also agree to receive subsequent email and third-party
            communications, which you may opt out of at any time.
          </p>
        </div>
        <div className="text-center text-sm space-y-2">
          <Button type="submit" disabled={isMutating}>
            Log In
          </Button>
          <p className="text-auth-mute">
            Not a member?{" "}
            <Link href="/signup" className="text-auth-blue hover:underline">
              Sign up
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-auth-blue hover:underline block"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </form>
  );
}
