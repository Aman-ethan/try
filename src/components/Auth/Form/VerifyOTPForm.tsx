"use client";

import { cookieOptions } from "@/constants/cookie";
import { AccessTokenKey, RefreshTokenKey } from "@/constants/strings";
import { useAuthServerMutation } from "@/hooks/useMutation";
import useSearchParams from "@/hooks/useSearchParams";
import { getExpiryFromToken } from "@/lib/token";
import { Button, Form, Input, InputRef, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import Paragraph from "../../Typography/Paragraph";
import ResendOTP from "../General/ResendOTP";

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
  const nextPath = searchParams.get("next_path") as
    | "/reset-password"
    | undefined;

  const { trigger, isMutating } = useAuthServerMutation<
    IVerifyOTPArgs,
    IVerifyOTPResponse
  >("/verify-otp", {
    onSuccess(data) {
      const { access_token, refresh_token } = data;
      if (access_token && refresh_token) {
        switch (nextPath) {
          case "/reset-password": {
            // setting a session cookie
            setCookie(AccessTokenKey, access_token, cookieOptions);
            replace(nextPath);
            break;
          }
          default: {
            setCookie(AccessTokenKey, access_token, {
              ...cookieOptions,
              expires: getExpiryFromToken(access_token),
            });
            setCookie(RefreshTokenKey, refresh_token, {
              ...cookieOptions,
              expires: getExpiryFromToken(refresh_token),
            });
          }
        }
      }
    },
  });

  useEffect(() => {
    if (userId) return;
    push("/login");
  }, [userId, push]);

  const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (value === "" || Number.isNaN(Number(value))) return "";
    if (Number(name) < 5) otpRef.current[Number(name) + 1]?.focus();
    return e.target.value;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    if (!value && e.key === "Backspace" && Number(name) > 0)
      otpRef.current[Number(name) - 1]?.focus();
  };

  function getRef(index: number) {
    return (e: InputRef) => {
      otpRef.current = {
        ...otpRef.current,
        [index]: e,
      };
    };
  }

  return userId ? (
    <Form
      form={form}
      onFinish={(data) => {
        if (data.otp.length !== OPT_LENGTH) {
          message.error("Please enter a valid OTP");
        } else {
          trigger({ otp: data.otp.join(""), user_id: userId });
        }
      }}
      disabled={isMutating}
      size="large"
      className="space-y-10"
    >
      <Row justify="space-between" className="gap-2">
        {Array.from({ length: OPT_LENGTH }).map((_, index) => (
          <Form.Item
            noStyle
            name={["otp", index]}
            key={`${index.toString()}`}
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
              className="h-12 w-12 border-primary text-center text-base font-medium text-neutral-11"
            />
          </Form.Item>
        ))}
      </Row>
      <div className="space-y-8">
        <Button block type="primary" htmlType="submit" loading={isMutating}>
          Verify & Proceed
        </Button>
        <Paragraph>
          Didn&apos;t receive OTP?{" "}
          <ResendOTP forgotPassword={nextPath === "/reset-password"} />
        </Paragraph>
      </div>
    </Form>
  ) : null;
}
