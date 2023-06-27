"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import {
  ILoginArgs,
  ILoginResponse,
  IResendOTPProps,
  IUserArgs,
} from "@/interfaces/Auth";
import { useEffect, useState } from "react";

const OTP_WAIT_TIME = 60;

export default function ResendOTP({ forgotPassword }: IResendOTPProps) {
  const [seconds, setSeconds] = useState(OTP_WAIT_TIME);
  const resendOTPEnabled = seconds === 0;

  const { trigger } = useAuthServerMutation<
    ILoginArgs | IUserArgs,
    ILoginResponse
  >(forgotPassword ? "/api/forgot-password" : "/api/login");

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
    const password = searchParams.get("password");
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
          ? "text-primary hover:underline cursor-pointer"
          : "text-neutral-12/25 cursor-not-allowed"
      }
    >
      Resend Code
      {resendOTPEnabled ? "" : ` (0:${seconds.toString().padStart(2, "0")})`}
    </button>
  );
}
