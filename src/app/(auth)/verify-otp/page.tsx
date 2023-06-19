import Paragraph from "@/components/Auth/Common/Paragraph";
import Title from "@/components/Auth/Common/Title";
import VerifyOTPForm from "@/components/Auth/Form/VerifyOTPForm";

export default function VerifyOTPPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Title>OTP Verification</Title>
        <Paragraph>Enter the OTP code sent to +</Paragraph>
      </div>
      <VerifyOTPForm />
    </div>
  );
}
