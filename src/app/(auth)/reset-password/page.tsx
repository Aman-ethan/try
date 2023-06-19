import ResetPasswordForm from "@/components/Auth/Form/ResetPasswordForm";
import Title from "@/components/Auth/Common/Title";
import Paragraph from "@/components/Auth/Common/Paragraph";

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
