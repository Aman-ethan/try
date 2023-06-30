import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import LoginForm from "@/components/Auth/Form/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-12">
        <div className="space-y-4">
          <Title>Login</Title>
          <Paragraph>
            Maximize wealth management efficiency with Ethan.ai Cloud - unified
            portfolios, AI integration, simplified document search
          </Paragraph>
        </div>
        <LoginForm />
      </div>
      <div className="space-y-8">
        <Link
          href="/forgot-password"
          className="inline-block hover:underline focus:underline"
        >
          Forgot Password?
        </Link>
        <Paragraph>
          Not registered yet?&nbsp;
          <Link
            href="/signup"
            className="font-medium hover:underline focus:underline"
          >
            Create an account
          </Link>
        </Paragraph>
      </div>
    </div>
  );
}
