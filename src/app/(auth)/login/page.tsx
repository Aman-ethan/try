import LoginForm from "@/components/Auth/Form/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-medium">Login</h2>
          <p className="text-neutral-9">
            Maximize wealth management efficiency with Ethan.ai Cloud - unified
            portfolios, AI integration, simplified document search
          </p>
        </div>
        <LoginForm />
      </div>
      <div className="space-y-8">
        <Link href="/forgot-password" className="hover:underline focus:underline inline-block">
          Forgot Password?
        </Link>
        <p className="text-neutral-9">
          Not registered yet?&nbsp;
          <Link
            href="/signup"
            className="hover:underline focus:underline font-medium"
          >Create an account</Link>
        </p>
      </div>
    </div>
  );
}
