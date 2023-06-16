import ForgotPasswordForm from "@/components/Auth/Form/ForgotPasswordForm";
import { Title, Paragraph } from "@/lib/antd";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Title level={2}>Forgot your password?</Title>
        <Paragraph className="text-neutral-9">To reset your password, enter the phone number of your account</Paragraph>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
