import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import VerifyOTPForm from "@/components/Auth/Form/VerifyOTPForm";
import PhoneNumber from "@/components/Auth/General/PhoneNumber";

export default function VerifyOTPPage() {
  return (
    <div className="h-auto space-y-12">
      <div className="space-y-4">
        <Title>OTP Verification</Title>
        <Paragraph>
          Enter the OTP code sent to{" "}
          <span className="font-medium text-neutral-11">
            <PhoneNumber />
          </span>
        </Paragraph>
      </div>
      <VerifyOTPForm />
    </div>
  );
}
