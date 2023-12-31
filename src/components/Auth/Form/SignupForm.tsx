"use client";

import { Button, Checkbox, Form, FormRule, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
import Select from "@/components/Input/Select";
import { TIME_FORMAT } from "@/constants/format";
import Timezones from "@/constants/timezones";
import { useAuthServerMutation } from "@/hooks/useMutation";
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

const FormRules: Partial<Record<keyof ISignupForm, FormRule[]>> = {
  email: [{ required: true, message: "Please enter your email" }],
  phone_number: [{ required: true, message: "Please enter your phone number" }],
  terms_and_conditions: [
    { required: true, message: "Please accept the terms and conditions" },
  ],
};

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
  });

  const handleSignup = ({
    source,
    terms_and_conditions: _,
    time,
    timezone,
    ...rest
  }: ISignupForm) => {
    router.prefetch("/signup-success");
    const offset = Timezones.find((t) => t.text === timezone)?.offset as number;
    const contact_time = dayjs(time)
      .utcOffset(offset, true)
      .utc()
      .format(TIME_FORMAT);
    trigger({
      ...rest,
      contact_time,
      media: media === "Other" ? source : media,
    });
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
      requiredMark={false}
    >
      <div className="space-y-6">
        <div className="space-y-6 tab:flex tab:flex-row tab:space-x-4 tab:space-y-0">
          <Form.Item label="Username" name="name" className="flex-1">
            <Input type="text" placeholder="john doe" autoFocus />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="flex-1"
            rules={FormRules.email}
          >
            <Input type="email" placeholder="john.doe@acme.com" />
          </Form.Item>
        </div>
        <PhoneInput rules={FormRules.phone_number} />
        <div className="space-y-6 tab:flex tab:flex-row tab:space-x-4 tab:space-y-0">
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
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-medium">When can we contact you?</span>
          <div className="flex gap-x-4">
            <Form.Item
              name="time"
              htmlFor="time"
              className="flex-[0.5] tab:flex-1"
            >
              <TimePicker
                id="time"
                format="HH:mm A"
                placeholder="10:00 AM"
                use12Hours
                className="w-full"
              />
            </Form.Item>
            <Form.Item name="timezone" className="flex-1">
              <Select
                placeholder="Select timezone"
                options={timezoneOptions}
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          label="Where did you hear about us?"
          htmlFor="media"
          name="media"
        >
          <Select
            id="media"
            placeholder="Google"
            options={referralOptions}
            className="w-full"
          />
        </Form.Item>
        {media === "Other" && (
          <Form.Item noStyle label="State Here" name="source">
            <Input type="text" placeholder="State Here" />
          </Form.Item>
        )}
        <Form.Item
          name="terms_and_conditions"
          valuePropName="checked"
          rules={FormRules.terms_and_conditions}
        >
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
        htmlType="submit"
        type="primary"
        block
        loading={isMutating}
        className="mt-8 tab:mt-10"
      >
        Create Account
      </Button>
    </Form>
  );
}
