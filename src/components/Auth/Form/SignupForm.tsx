"use client";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import Link from "next/link";
import { useAuthServerMutation } from "@/hooks/useMutation";
import Timezones from "@/constants/timezones";
import PhoneInput from "./PhoneInput";
import { useRouter } from "next/navigation";

interface ISignupResponse {
  id: string;
}

interface ISignupArgs {
  username: string;
  email: string;
  phone_number: string;
  country_code: string;
  media: string;
  company_name: string;
  designation: string;
  time: Date;
  source: string;
}

const REFERRAL_SOURCE = [
  "Google Search Engine",
  "Social Media",
  "Blog or Publication",
  "Other",
];

export default function SignupForm() {
  const router = useRouter();
  const [form] = Form.useForm<ISignupArgs>();
  const media = Form.useWatch("media", form);

  const { trigger, isMutating } = useAuthServerMutation<
    ISignupArgs,
    ISignupResponse
  >("/api/contacts/", {
    onSuccess(data) {
      if (data.id) {
        form.resetFields();
        message.success("Thank you! Your data is recorded.");
        router.replace("/signup-success");
      }
    },
    onError() {
      message.error("Something went wrong. Please try again.");
    },
  });

  return (
    <Form
      layout="vertical"
      form={form}
      disabled={isMutating}
      onFinish={(data) => {
        const { source } = data;
        trigger({ ...data, media: media === "Other" ? source : media });
      }}
      size="large"
      labelCol={{ className: "font-medium" }}
      className="space-y-10"
    >
      <div className="space-y-6">
        <Row justify="space-between">
          <Form.Item label="Username" name="username">
            <Input type="text" placeholder="john doe" autoFocus />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="john.doe@acme.com" />
          </Form.Item>
        </Row>
        <PhoneInput />
        <Row justify="space-between">
          <Form.Item label="Company Name" name="company_name">
            <Input type="text" placeholder="Acme Inc." />
          </Form.Item>
          <Form.Item label="Designation" name="designation">
            <Input type="text" placeholder="Founder" />
          </Form.Item>
        </Row>
        <Row className="gap-x-2">
          <Form.Item
            label="When can we contact you?"
            name="time"
            htmlFor="time"
            className="flex-1"
          >
            <TimePicker
              id="time"
              format="HH:mm A"
              placeholder="10:00 AM"
              use12Hours
              className="w-full"
            />
          </Form.Item>
          <Form.Item label=" " name="timezone" className="flex-1">
            <Select placeholder="Select timezone">
              {Timezones.map(({ text }) => (
                <Select.Option key={text} value={text}>
                  {text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Row>
        <Form.Item
          label="Where did you hear about us?"
          htmlFor="media"
          name="media"
        >
          <Select id="media" placeholder="Google">
            {REFERRAL_SOURCE.map((source) => (
              <Select.Option key={source} value={source}>
                {source}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {media === "Other" && (
          <Form.Item noStyle label="State Here" name="source">
            <Input type="text" placeholder="State Here" />
          </Form.Item>
        )}
        <Form.Item noStyle name="t&c">
          <Row className="space-x-2">
            <Checkbox />
            <span className="text-neutral-13/80">
              I agree to the{" "}
              <Link href="/" className="font-medium">
                Terms & Conditions
              </Link>
            </span>
          </Row>
        </Form.Item>
      </div>
      <Button htmlType="submit" type="primary" block loading={isMutating}>
        Create Account
      </Button>
    </Form>
  );
}
