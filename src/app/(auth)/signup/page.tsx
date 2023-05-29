"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { message } from "antd";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import Link from "next/link";

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
  time: string;
  source: string;
}

async function signup(key: string, { arg }: Readonly<{ arg: ISignupArgs }>) {
  const { phoneNumber, countryCode, source, media, ...rest } = arg;
  const res = await fetch(
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL +
      key +
      new URLSearchParams({
        ...rest,
        phone_number: phoneNumber,
        code: countryCode,
        media: media === "Other" ? source : media,
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
  const { register, handleSubmit, reset, watch } = useForm<ISignupArgs>();
  const media = watch("media");

  const { trigger, isMutating } = useSWRMutation<
    ISignupResponse | void,
    Error,
    string,
    ISignupArgs
  >("/api/contact_us/?", signup, {
    onSuccess(data) {
      if (data?.id) {
        reset();
        message.success("Thank you! Your data is recorded.");
        fetch(`/api/send_email/?contact_id=${data.id}`);
        router.push("/login");
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => trigger(data))}
      className="flex flex-col space-y-6"
    >
      <p className="text-[#727272] text-2xl">Please enter your credentials</p>
      <div className="space-y-4 w-full">
        <Input
          type="text"
          placeholder="Enter Username"
          disabled={isMutating}
          {...register("username")}
        />
        <Input
          type="email"
          placeholder="Enter Email ID"
          disabled={isMutating}
          {...register("email")}
        />
        <div className="flex gap-x-4">
          <Input
            placeholder="Country Code"
            type="number"
            className="w-1/2"
            disabled={isMutating}
            {...register("countryCode")}
          />
          <Input
            placeholder="Enter Phone Number"
            type="tel"
            disabled={isMutating}
            {...register("phoneNumber")}
          />
        </div>
        <Input
          type="text"
          placeholder="Enter Company Name"
          disabled={isMutating}
          {...register("company")}
        />
        <Input
          type="text"
          placeholder="Enter Designation"
          disabled={isMutating}
          {...register("designation")}
        />
        <label htmlFor="time" className="block">
          <span className="font-medium">When can we contact you?</span>
          <Input
            id="time"
            defaultValue="10:00"
            type="time"
            disabled={isMutating}
            {...register("time")}
          />
        </label>
        <label htmlFor="media" className="block">
          <span className="font-medium">How did you hear about us?</span>
          {REFERRAL_SOURCE.map((source) => (
            <label
              key={source}
              htmlFor={source.toLowerCase().replace(" ", "_")}
              className="flex items-center gap-x-2"
            >
              <input
                type="radio"
                id={source.toLowerCase().replace(" ", "_")}
                value={source}
                disabled={isMutating}
                {...register("media")}
              />
              {source}
            </label>
          ))}
        </label>
        {media === "Other" && (
          <Input
            type="text"
            placeholder="State Here"
            disabled={isMutating}
            {...register("source")}
          />
        )}
      </div>
      <div className="mx-auto space-y-2">
        <Button type="submit" disabled={isMutating}>
          Submit
        </Button>
        <p className="text-sm text-auth-mute">
          Already a member?{" "}
          <Link href="/login" className="text-auth-blue hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
