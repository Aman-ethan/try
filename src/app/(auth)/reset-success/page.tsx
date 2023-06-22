import Paragraph from "@/components/Auth/Typography/Paragraph";
import Title from "@/components/Auth/Typography/Title";
import { Button } from "@/lib/antd";
import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Title>Password Changed!</Title>
        <Paragraph>You set up a new password for your account.</Paragraph>
      </div>
      <Link href="/login" className="block">
        <Button type="primary" size="large" block>
          Login
        </Button>
      </Link>
    </div>
  );
}
