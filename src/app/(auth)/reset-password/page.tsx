import ResetPasswordForm from "@/components/Auth/Forms/ResetPasswordForm";
import Title from "@/components/Auth/Typography/Title";
import Paragraph from "@/components/Auth/Typography/Paragraph";

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
