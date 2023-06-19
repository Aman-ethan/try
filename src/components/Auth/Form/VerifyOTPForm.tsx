"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input, InputRef, Row, message } from "antd";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useAuthServerMutation } from "@/hooks/useMutation";
import Paragraph from "../Common/Paragraph";
import ResendOTP from "../ResendOTP";

interface IVerifyOTPResponse {
  access_token: string;
  refresh_token: string;
}

interface IVerifyOTPArgs {
  user_id: string;
  otp: string;
}

const OPT_LENGTH = 6;

export default function VerifyOTPForm() {
  const [form] = Form.useForm();
  const { push, replace } = useRouter();
  const otpRef = useRef<Record<string, InputRef | null>>({});
  const setCookie = useCookies<string>([])[1];

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  const { trigger, isMutating } = useAuthServerMutation<
    IVerifyOTPArgs,
    IVerifyOTPResponse
  >("/api/verify-otp", {
    onSuccess(data) {
      if (data.access_token && data.refresh_token) {
        const nextPath = searchParams.get("next_path");
        switch (nextPath) {
          case "/reset-password":
            // setting a session cookie
            setCookie("access_token", data.access_token, {
              sameSite: "lax",
              secure: true,
            });
            return replace(nextPath);
          default:
            const currentDate = Date.now();
            setCookie("access_token", data.access_token, {
              sameSite: "lax",
              secure: true,
              expires: new Date(currentDate + 1000 * 60 * 60),
            });
            setCookie("refresh_token", data.refresh_token, {
              sameSite: "lax",
              secure: true,
              expires: new Date(currentDate + 1000 * 60 * 60 * 2),
            });
        }
      }
    },
    onError() {
      otpRef.current[OPT_LENGTH - 1]?.focus();
      message.error("OTP is incorrect. Please try again.");
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

  return userId ? (
    <>
      <Form
        form={form}
        onFinish={(data) =>
          trigger({ otp: data.otp.join(""), user_id: userId })
        }
        disabled={isMutating}
        size="large"
        className="space-y-10"
      >
        <Row justify="space-between" className="gap-2">
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
                className="text-base border-primary w-12 h-12 text-center text-neutral-11 font-medium valid:bg-primary-1"
              />
            </Form.Item>
          ))}
        </Row>
        <div className="space-y-8">
          <Button block type="primary" htmlType="submit" loading={isMutating}>
            Verify & Proceed
          </Button>
          <Paragraph>
            Didn&apos;t receive OTP? <ResendOTP />
          </Paragraph>
        </div>
      </Form>
    </>
  ) : null;
}
