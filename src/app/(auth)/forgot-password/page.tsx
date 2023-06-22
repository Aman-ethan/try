import Paragraph from "@/components/Auth/Typography/Paragraph";
import Title from "@/components/Auth/Typography/Title";
import ForgotPasswordForm from "@/components/Auth/Forms/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-12">
        <div className="space-y-4">
          <Title>Forgot your password?</Title>
          <Paragraph>
            To reset your password, enter the phone number of your account
          </Paragraph>
        </div>
        <ForgotPasswordForm />
      </div>
      <Paragraph>
        <Link href="/login" className="hover:underline focus:underline">
          Back to Login
        </Link>
      </Paragraph>
    </div>
  );
}
