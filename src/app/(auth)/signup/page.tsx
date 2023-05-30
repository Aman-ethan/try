"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Radio,
  Space,
  TimePicker,
  Typography,
  message,
} from "antd";
import Link from "next/link";
import SubHeading from "@/components/Auth/SubHeading";
import Heading from "@/components/Auth/Heading";
import {
  BankOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface ISignupResponse {
  id: string;
}

interface ISignupArgs {
  username: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  media: string;
  company: string;
  designation: string;
  time: Date;
  source: string;
}

async function signup(key: string, { arg }: Readonly<{ arg: ISignupArgs }>) {
  const { phoneNumber, source, media, time, ...rest } = arg;
  const res = await fetch(
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL +
      key +
      new URLSearchParams({
        ...rest,
        phone_number: phoneNumber,
        media: media === "Other" ? source : media,
        time: time.toISOString(),
      })
  );
  if (!res.ok) {
    message.error("Something went wrong. Please try again.");
  } else {
    return res.json();
  }
}

const REFERRAL_SOURCE = [
  "Google Search Engine",
  "Social Media",
  "Blog or Publication",
  "Other",
];

export default function SignupPage() {
  const router = useRouter();
  const [form] = Form.useForm<ISignupArgs>();
  const media = Form.useWatch("media", form);
  console.log(media);
  const { trigger, isMutating } = useSWRMutation<
    ISignupResponse | void,
    Error,
    string,
    ISignupArgs
  >("/api/contact_us/?", signup, {
    onSuccess(data) {
      if (data?.id) {
        form.resetFields();
        message.success("Thank you! Your data is recorded.");
        fetch(
          "/api/send_email/?" + new URLSearchParams({ contact_id: data.id })
        );
        router.push("/login");
      }
    },
  });

  return (
    <Space direction="vertical">
      <Heading />
      <SubHeading />
      <Form
        layout="vertical"
        form={form}
        onFinish={(data) => trigger(data)}
        disabled={isMutating}
        size="large"
        labelCol={{ className: "font-medium -my-2" }}
      >
        <Space direction="vertical" size="small">
          <Form.Item noStyle label="Enter Username" name="username">
            <Input
              type="text"
              placeholder="Enter Username"
              addonBefore={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item noStyle label="Enter Email ID" name="email">
            <Input
              type="email"
              placeholder="Enter Email ID"
              addonBefore={<MailOutlined />}
            />
          </Form.Item>
          <Space.Compact block>
            <Form.Item noStyle label="Country Code" name="code">
              <Input
                type="tel"
                placeholder="Country Code"
                className="w-3/5"
                addonBefore={<PlusOutlined />}
              />
            </Form.Item>
            <Form.Item noStyle label="Phone Number" name="phoneNumber">
              <Input
                type="tel"
                placeholder="Enter Phone Number"
                addonBefore={<PhoneOutlined />}
              />
            </Form.Item>
          </Space.Compact>
          <Form.Item noStyle label="Enter Company Name" name="company">
            <Input
              type="text"
              placeholder="Enter Company Name"
              addonBefore={<BankOutlined />}
            />
          </Form.Item>
          <Form.Item noStyle label="Enter Designation" name="designation">
            <Input
              type="text"
              placeholder="Enter Designation"
              addonBefore={<IdcardOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="When can we contact you?"
            name="time"
            htmlFor="time"
          >
            <TimePicker
              id="time"
              format="HH:mm A"
              className="w-full"
              placeholder="10:00 AM"
              use12Hours
            />
          </Form.Item>
          <Form.Item
            label="How did you hear about us?"
            htmlFor="media"
            name="media"
            className="-mt-6 -mb-0.5"
          >
            <Radio.Group id="media">
              <Space direction="vertical">
                {REFERRAL_SOURCE.map((source) => (
                  <Radio key={source} value={source}>
                    {source}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          {media === "Other" && (
            <Form.Item noStyle label="State Here" name="source">
              <Input type="text" placeholder="State Here" />
            </Form.Item>
          )}
          <Space direction="vertical" align="center" className="w-full pt-10">
            <Button
              htmlType="submit"
              type="primary"
              className="px-12"
              loading={isMutating}
            >
              Submit
            </Button>
            <Typography.Text type="secondary">
              Already a member?{" "}
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </Typography.Text>
          </Space>
        </Space>
      </Form>
    </Space>
  );
}
