import Paragraph from "@/components/Auth/Typography/Paragraph";
import Title from "@/components/Auth/Typography/Title";
import SignupForm from "@/components/Auth/Forms/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="space-y-8 pb-8">
      <Title>Create an account</Title>
      <SignupForm />
      <Paragraph>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline focus:underline"
        >
          Login
        </Link>
      </Paragraph>
    </div>
  );
}
