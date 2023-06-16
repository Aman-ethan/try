import { Space } from "@/lib/antd";
import SignupForm from "@/components/Auth/Form/SignupForm";

export default function SignupPage() {
  return (
    <Space direction="vertical">
      <SignupForm />
    </Space>
  );
}
