"use client";

import { LikeTwoTone } from "@ant-design/icons";
import { Result } from "antd";

export default function SignupSuccessPage() {
  return (
    <Result
      status="success"
      title="Thank you for your interest!"
      subTitle="Our team will contact you soon."
      icon={
        <div className="inline-block h-16 w-16 rounded-full border-4 border-primary-2">
          <LikeTwoTone className="relative top-1/2 -translate-y-1/2 text-3xl text-primary" />
        </div>
      }
    />
  );
}
