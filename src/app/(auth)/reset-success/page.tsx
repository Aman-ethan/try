"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function ResetSuccessPage() {
  const router = useRouter();
  return (
    <Result
      status="success"
      title="Password Reset Successful"
      subTitle="You can now login to your account using your password"
      extra={[
        <Button
          type="primary"
          size="large"
          onClick={() => router.replace("/login")}
          className="px-10"
        >
          Log In
        </Button>,
      ]}
    />
  );
}
