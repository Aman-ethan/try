import VerifyOTPForm from "@/components/Auth/Form/VerifyOTPForm";
import { Paragraph, Title } from "@/lib/antd";

export default function VerifyOTPPage() {
  return (
    <div className="space-y-12">
      <Title level={2}>OTP Verification</Title>
      <Paragraph>Enter the OTP code sent to +</Paragraph>
      <VerifyOTPForm>
      </VerifyOTPForm>
    </div>
  );
}
