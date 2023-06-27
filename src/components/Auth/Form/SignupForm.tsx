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
import { useAuthServerMutation } from "@/hooks/useMutation";
import Timezones from "@/constants/timezones";
import { useRouter } from "next/navigation";
import PhoneInput from "../../Input/PhoneInput";

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
  terms_and_conditions: boolean;
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

  const handleSignup = (data: ISignupArgs) => {
    const { source, terms_and_conditions } = data;
    if (!terms_and_conditions) {
      message.error("Please accept the terms and conditions.");
    } else {
      trigger({ ...data, media: media === "Other" ? source : media });
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      disabled={isMutating}
      onFinish={handleSignup}
      size="large"
      labelCol={{ className: "font-medium" }}
      className="space-y-10"
    >
      <div className="space-y-6">
        <Row justify="space-between" className="gap-x-4">
          <Form.Item label="Username" name="username" className="flex-1">
            <Input type="text" placeholder="john doe" autoFocus />
          </Form.Item>
          <Form.Item label="Email" name="email" className="flex-1">
            <Input type="email" placeholder="john.doe@acme.com" />
          </Form.Item>
        </Row>
        <PhoneInput />
        <Row justify="space-between" className="gap-x-4">
          <Form.Item
            label="Company Name"
            name="company_name"
            className="flex-1"
          >
            <Input type="text" placeholder="Acme Inc." />
          </Form.Item>
          <Form.Item label="Designation" name="designation" className="flex-1">
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
          <Form.Item label="&nbsp;" name="timezone" className="flex-1">
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
        <Form.Item name="terms_and_conditions">
          <Checkbox>
            <span className="text-neutral-13/80">
              I agree to the{" "}
              <a
                href="https://www.ethan-ai.com/privacy"
                className="font-medium"
                target="_blank"
                rel="noreferrer"
              >
                Terms & Conditions
              </a>
            </span>
          </Checkbox>
        </Form.Item>
      </div>
      <Button
        disabled
        htmlType="submit"
        type="primary"
        block
        loading={isMutating}
      >
        Create Account
      </Button>
    </Form>
  );
}
