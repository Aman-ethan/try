"use client";

import Select from "@/components/Input/Select";
import Title from "@/components/Typography/Title";
import { useTransactionServerPutMutation } from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import formatInitialValues from "@/lib/formatInitialValues";
import formatTriggerValues from "@/lib/formatTriggerValues";
import revalidate from "@/lib/revalidate";
import { Button, Form, Input, Row, message } from "antd";
import { useEffect } from "react";
import { DatePicker } from "../Input/DatePicker";

type TClient = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  identification_number: string;
  occupation: string;
  reporting_currency: string;
  tax_residency: string;
  risk_profile: string;
  email: string;
  phone_number: string;
  street: string;
  city: string;
  country: string;
  postal_code: string;
  state: string;
};

const RiskLevels = [
  {
    value: "conservative",
    label: "Conservative",
  },
  {
    value: "moderate",
    label: "Moderate",
  },
  {
    value: "aggressive",
    label: "Aggressive",
  },
];

function useClient() {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client_id");
  const urlKey = `/client/${client_id}/`;
  const { data, isLoading } = useTransactionServerQuery<TClient>(urlKey);

  const { trigger: updateClient, isMutating } =
    useTransactionServerPutMutation<TClient>(urlKey, {
      onSuccess: () => {
        message.success("Client updated successfully");
        revalidate(urlKey, false);
      },
    });

  return {
    data,
    updateClient,
    loading: isLoading || isMutating,
  };
}

const ClientInformationMap: Record<keyof TClient, string> = {
  first_name: "First Name",
  last_name: "Last Name",
  date_of_birth: "Date Of Birth",
  nationality: "Nationality",
  identification_number: "Identification Number",
  occupation: "Occupation",
  reporting_currency: "Reporting Currency",
  tax_residency: "Tax Residency",
  risk_profile: "Risk Profile",
  email: "Email",
  phone_number: "Phone Number",
  street: "Address",
  city: "City",
  country: "Country",
  postal_code: "Postal Code",
  state: "State",
};

type TFormType = keyof TClient;

interface IClientDetailProps {
  type: TFormType;
}

function DetailsForm({ type }: IClientDetailProps) {
  switch (type) {
    case "date_of_birth":
      return (
        <Form.Item key={type} label={ClientInformationMap[type]} name={type}>
          <DatePicker placeholder="Choose Date Of Birth" />
        </Form.Item>
      );
    case "risk_profile":
      return (
        <Form.Item key={type} label={ClientInformationMap[type]} name={type}>
          <Select placeholder="Choose risk profile" options={RiskLevels} />
        </Form.Item>
      );
    case "street":
      return (
        <Form.Item key={type} label={ClientInformationMap[type]} name={type}>
          <Input.TextArea
            placeholder={`Enter the ${ClientInformationMap[type]}`}
          />
        </Form.Item>
      );
    default:
      return (
        <Form.Item key={type} label={ClientInformationMap[type]} name={type}>
          <Input placeholder={`Enter the ${ClientInformationMap[type]}`} />
        </Form.Item>
      );
  }
}

export default function ProfileEdit() {
  const [form] = Form.useForm();
  const { data, loading, updateClient } = useClient();

  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex w-11/12 items-center justify-between">
        <Title className="text-base">Edit Profile</Title>
        <div className="text-base">
          <Button
            onClick={() => {
              form.setFieldsValue(
                Object.keys(ClientInformationMap).reduce(
                  (acc, key) => ({ ...acc, [key]: "" }),
                  {}
                )
              );
            }}
          >
            Clear All
          </Button>
        </div>
      </div>
      <Form
        form={form}
        initialValues={formatInitialValues(data)}
        layout="vertical"
        className=" w-11/12"
        onFinish={(values) => {
          updateClient(formatTriggerValues(values));
        }}
        size="large"
        disabled={loading}
      >
        <Row className="grid grid-cols-1 gap-y-6 gap-x-16 tab:grid-cols-2">
          {Object.keys(ClientInformationMap).map((key) => (
            <DetailsForm key={key} type={key as TFormType} />
          ))}
        </Row>
        <Row className=" float-right mt-4 flex gap-4 align-middle">
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Row>
      </Form>
    </div>
  );
}
