"use client";

import { Button, Checkbox, Form, Input, Row, TimePicker, message } from "antd";
import { useAuthServerMutation } from "@/hooks/useMutation";
import Timezones from "@/constants/timezones";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Select from "@/components/Input/Select";
import { TIME_FORMAT } from "@/constants/format";
import PhoneInput from "../../Input/PhoneInput";

dayjs.extend(utc);

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
  contact_time: string;
}

interface ISignupForm extends ISignupArgs {
  time: Date;
  timezone: string;
  source: string;
  terms_and_conditions: boolean;
}

const REFERRAL_SOURCE = [
  "Google Search Engine",
  "Social Media",
  "Blog or Publication",
  "Other",
];

const timezoneOptions = Timezones.map(({ text }) => ({
  label: text,
  value: text,
}));

const referralOptions = REFERRAL_SOURCE.map((source) => ({
  label: source,
  value: source,
}));

export default function SignupForm() {
  const router = useRouter();
  const [form] = Form.useForm<ISignupForm>();
  const media = Form.useWatch("media", form);

  const { trigger, isMutating } = useAuthServerMutation<
    ISignupArgs,
    ISignupResponse
  >("/contacts/", {
    onSuccess(data) {
      if (data.id) {
        form.resetFields();
        router.replace("/signup-success");
      }
    },
    onError(error) {
      message.error(error.message);
    },
  });

  const handleSignup = ({
    source,
    terms_and_conditions,
    time,
    timezone,
    ...rest
  }: ISignupForm) => {
    if (terms_and_conditions) {
      router.prefetch("/signup-success");
      const offset = Timezones.find((t) => t.text === timezone)
        ?.offset as number;
      const contact_time = dayjs(time)
        .utcOffset(offset, true)
        .utc()
        .format(TIME_FORMAT);
      trigger({
        ...rest,
        contact_time,
        media: media === "Other" ? source : media,
      });
    } else {
      message.error("Please accept the terms and conditions.");
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
          <Form.Item label="Username" name="name" className="flex-1">
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
          <Form.Item label="&nbsp;" name="timezone" className="w-1/2">
            <Select placeholder="Select timezone" options={timezoneOptions} />
          </Form.Item>
        </Row>
        <Form.Item
          label="Where did you hear about us?"
          htmlFor="media"
          name="media"
        >
          <Select id="media" placeholder="Google" options={referralOptions} />
        </Form.Item>
        {media === "Other" && (
          <Form.Item noStyle label="State Here" name="source">
            <Input type="text" placeholder="State Here" />
          </Form.Item>
        )}
        <Form.Item name="terms_and_conditions" valuePropName="checked">
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
      <Button htmlType="submit" type="primary" block loading={isMutating}>
        Create Account
      </Button>
    </Form>
  );
}
