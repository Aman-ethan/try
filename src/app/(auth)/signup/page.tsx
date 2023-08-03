import Link from "next/link";
import Paragraph from "@/components/Typography/Paragraph";
import Title from "@/components/Typography/Title";
import SignupForm from "@/components/Auth/Form/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex h-auto flex-col space-y-8 pb-8">
      <Title>Create an account</Title>
      <SignupForm />
      <div className="flex flex-grow items-end justify-center pb-8 tab:items-start tab:justify-start tab:pb-0">
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
    </div>
  );
}
