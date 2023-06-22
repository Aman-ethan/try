import ResetPasswordForm from "@/components/Auth/Form/ResetPasswordForm";
import Title from "@/components/Typography/Title";
import Paragraph from "@/components/Typography/Paragraph";

export default function ResetPasswordPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Title>Reset Password</Title>
        <Paragraph>Enter a new password for your account</Paragraph>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
