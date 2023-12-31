import Link from "next/link";
import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import { Button } from "@/lib/antd";

export default function ResetSuccessPage() {
  return (
    <div className="h-auto space-y-12">
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
