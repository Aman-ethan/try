import Paragraph from "@/components/Auth/Common/Paragraph";
import Title from "@/components/Auth/Common/Title";
import SignupForm from "@/components/Auth/Form/SignupForm";
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
