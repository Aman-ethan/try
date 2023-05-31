import Heading from "@/components/Auth/Common/Heading";
import SubHeading from "@/components/Auth/Common/SubHeading";
import ForgotPasswordForm from "@/components/Auth/Form/ForgotPasswordForm";
import { Space } from "@/lib/antd";

export default function ForgotPasswordPage() {
  return (
    <Space direction="vertical">
      <Heading />
      <SubHeading />
      <ForgotPasswordForm />
    </Space>
  );
}
