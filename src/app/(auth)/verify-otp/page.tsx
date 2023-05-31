"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { Button, Form, Input, InputRef, Space, message } from "antd";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import SubHeading from "@/app/(auth)/components/SubHeading";
import Cookies from "js-cookie";
import Heading from "@/app/(auth)/components/Heading";

interface IVerifyResponse {
  access_token: string;
  refresh_token: string;
}

interface IVerifyArgs {
  userId: string;
  otp: string[];
}

async function verify(key: string, { arg }: Readonly<{ arg: IVerifyArgs }>) {
  const res = await fetch(process.env.NEXT_PUBLIC_AUTH_SERVER_URL + key, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp: arg.otp.join(""), user_id: arg.userId }),
  });

  if (!res.ok) {
    message.error("OTP is incorrect. Please try again.");
  } else {
    return res.json();
  }
}

const OPT_LENGTH = 6;

export default function VerifyPage() {
  const [form] = Form.useForm();
  const { push } = useRouter();
  const otpRef = useRef<Record<string, InputRef | null>>({});

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const nextPath = searchParams.get("next_path");

  const { trigger, isMutating } = useSWRMutation<
    IVerifyResponse | void,
    Error,
    string,
    IVerifyArgs
  >("/api/verify-otp", verify, {
    onSuccess(data) {
      if (data?.access_token && data.refresh_token) {
        Cookies.set("access_token", data.access_token, {
          sameSite: "lax",
          secure: true,
          expires: Date.now() + 1000 * 60 * 60,
        });
        Cookies.set("refresh_token", data.refresh_token, {
          sameSite: "lax",
          secure: true,
          expires: Date.now() + 1000 * 60 * 60 * 2,
        });
        if (nextPath) push(nextPath);
        else push("/dashboard");
      } else {
        otpRef.current[OPT_LENGTH - 1]?.focus();
      }
    },
  });

  useEffect(() => {
    if (userId) return;
    push("/login");
  }, [userId, push]);

  function getValueFromEvent(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    if (value === "" || isNaN(Number(value))) return "";
    if (Number(name) < 5) otpRef.current[Number(name) + 1]?.focus();
    return e.target.value;
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const { value, name } = e.target as HTMLInputElement;
    if (!value && e.key === "Backspace" && Number(name) > 0)
      otpRef.current[Number(name) - 1]?.focus();
  }

  function getRef(index: number) {
    return (e: InputRef) => {
      otpRef.current = {
        ...otpRef.current,
        [index]: e,
      };
    };
  }

  return (
    !!userId && (
      <Space direction="vertical">
        <Heading />
        <SubHeading>Please enter the OTP</SubHeading>
        <Form
          form={form}
          onFinish={(data: IVerifyArgs) => trigger(data)}
          disabled={isMutating}
          size="large"
          initialValues={{ userId }}
          className="space-y-10"
        >
          <Form.Item noStyle name="userId">
            <Input type="hidden" />
          </Form.Item>
          <Space className="w-full justify-center">
            {Array.from({ length: OPT_LENGTH }).map((_, index) => (
              <Form.Item
                noStyle
                name={["otp", index]}
                key={index}
                rules={[{ max: 1 }]}
                getValueFromEvent={getValueFromEvent}
              >
                <Input
                  ref={getRef(index)}
                  autoFocus={index === 0}
                  onKeyDown={onKeyDown}
                  name={String(index)}
                  required
                  maxLength={1}
                  className="border-0 bg-transparent focus:border text-2xl w-14 h-14 text-center transition-none"
                  placeholder="•"
                />
              </Form.Item>
            ))}
          </Space>
          <Space className="w-full justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="px-10"
              loading={isMutating}
            >
              Verify
            </Button>
          </Space>
        </Form>
      </Space>
    )
  );
}
