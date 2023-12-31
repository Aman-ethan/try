import Link from "next/link";
import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import ForgotPasswordForm from "@/components/Auth/Form/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-8">
      <div className="space-y-12">
        <div className="space-y-4">
          <Title>Forgot your password?</Title>
          <Paragraph>
            To reset your password, enter the phone number of your account
          </Paragraph>
        </div>
        <ForgotPasswordForm />
      </div>

      <div className="flex flex-grow items-end justify-center pb-8 tab:items-start tab:justify-start tab:pb-0">
        <Paragraph>
          <Link href="/login" className="hover:underline focus:underline">
            Back to Login
          </Link>
        </Paragraph>
      </div>
    </div>
  );
}
