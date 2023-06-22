import Paragraph from "@/components/Auth/Typography/Paragraph";
import Title from "@/components/Auth/Typography/Title";
import VerifyOTPForm from "@/components/Auth/Forms/VerifyOTPForm";
import PhoneNumber from "@/components/Auth/Common/PhoneNumber";

export default function VerifyOTPPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Title>OTP Verification</Title>
        <Paragraph>
          Enter the OTP code sent to{" "}
          <span className="text-neutral-11 font-medium">
            <PhoneNumber />
          </span>
        </Paragraph>
      </div>
      <VerifyOTPForm />
    </div>
  );
}
