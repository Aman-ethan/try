"use client";

import { useAuthServerMutation } from "@/hooks/useMutation";
import { useEffect, useState } from "react";

const OTP_WAIT_TIME = 60;

export default function ResendOTP() {
  const [seconds, setSeconds] = useState(OTP_WAIT_TIME);
  const resendOTPEnabled = seconds === 0;

  const { trigger } = useAuthServerMutation<ILoginArgs, ILoginResponse>(
    "/api/login",
    {
      onSuccess(data) {
        if (data.user_id) {
          setSeconds(OTP_WAIT_TIME);
        }
      },
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        return seconds > 0 ? seconds - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function resendOTP() {
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get("username");
    const password = searchParams.get("password");
    if (username && password && resendOTPEnabled) {
      trigger({
        username,
        password: btoa(password),
      });
    }
  }

  return (
    <span
      onClick={resendOTP}
      className={
        resendOTPEnabled
          ? "text-primary hover:underline cursor-pointer"
          : "text-neutral-12/25 cursor-not-allowed"
      }
    >
      Resend Code{resendOTPEnabled ? "" : ` (0:${seconds})`}
    </span>
  );
}
