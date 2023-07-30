"use client";

import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useAuthServerMutation } from "@/hooks/useMutation";
import {
  ILoginArgs,
  ILoginResponse,
  IResendOTPProps,
  IUserArgs,
} from "@/interfaces/Auth";

const OTP_WAIT_TIME = 60;

export default function ResendOTP({ forgotPassword }: IResendOTPProps) {
  const [seconds, setSeconds] = useState(OTP_WAIT_TIME);
  const resendOTPEnabled = seconds === 0;

  const { trigger } = useAuthServerMutation<
    ILoginArgs | IUserArgs,
    ILoginResponse
  >(forgotPassword ? "/forgot-password" : "/login");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        return prevSeconds > 0 ? prevSeconds - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function resendOTP() {
    setSeconds(OTP_WAIT_TIME);
    const searchParams = new URLSearchParams(window.location.search);
    if (!resendOTPEnabled) return;
    const username = searchParams.get("username");
    if (forgotPassword && username) {
      trigger({
        username,
      });
      return;
    }
    const password = new Cookies().get("password");
    if (username && password) {
      trigger({
        username,
        password: atob(password),
      });
    }
  }

  return (
    <button
      type="button"
      onClick={resendOTP}
      className={
        resendOTPEnabled
          ? "cursor-pointer text-primary hover:underline"
          : "cursor-not-allowed text-neutral-12/25"
      }
    >
      Resend Code
      {resendOTPEnabled ? "" : ` (0:${seconds.toString().padStart(2, "0")})`}
    </button>
  );
}
