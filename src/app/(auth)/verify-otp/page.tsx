import { Space } from "@/lib/antd";
import SubHeading from "@/components/Auth/Common/SubHeading";
import Heading from "@/components/Auth/Common/Heading";
import VerifyOTPForm from "@/components/Auth/Form/VerifyOTPForm";

export default function VerifyOTPPage() {
  return (
    <Space direction="vertical">
      <VerifyOTPForm>
        <Heading />
        <SubHeading>Please enter the OTP</SubHeading>
      </VerifyOTPForm>
    </Space>
  );
}
