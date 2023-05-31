import { Space } from "@/lib/antd";
import SubHeading from "@/components/Auth/Common/SubHeading";
import Heading from "@/components/Auth/Common/Heading";
import SignupForm from "@/components/Auth/Form/SignupForm";

export default function SignupPage() {
  return (
    <Space direction="vertical">
      <Heading />
      <SubHeading />
      <SignupForm />
    </Space>
  );
}
