import { Space } from "@/lib/antd";
import Heading from "@/components/Auth/Common/Heading";
import SubHeading from "@/components/Auth/Common/SubHeading";
import ResetPasswordForm from "@/components/Auth/Form/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Space direction="vertical">
      <Heading>Reset Password</Heading>
      <SubHeading>Enter a new password for your account</SubHeading>
      <ResetPasswordForm />
    </Space>
  );
}
