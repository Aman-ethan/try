import { Space } from "@/lib/antd";
import SubHeading from "@/components/Auth/Common/SubHeading";
import Heading from "@/components/Auth/Common/Heading";
import LoginForm from "@/components/Auth/Form/LoginForm";

export default function LoginPage() {
  return (
    <Space direction="vertical" size="small">
      <Heading />
      <SubHeading />
      <LoginForm />
    </Space>
  );
}
