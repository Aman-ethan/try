"use client";

import {
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Form, message, Row } from "antd";
import { useEffect } from "react";
import Title from "@/components/Typography/Title";
import { useTransactionServerPutMutation } from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import revalidate from "@/lib/revalidate";

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
  const { data } = useTransactionServerQuery<TClient>(`/client/${client_id}/`);

  const { trigger: updateClient } = useTransactionServerPutMutation<TClient>(
    `/client/${client_id}/`,
    {
      onSuccess: () => {
        message.success("Client updated successfully");
        revalidate(`/client/`);
      },
    }
  );

  return {
    data,
    updateClient,
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
        // Not able to use general Date Picker , when I get the date from the server the date picker is not able to parse it
        <ProFormDatePicker
          width="lg"
          name="date_of_birth"
          placeholder="Choose Date Of Birth"
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
        />
      );
    case "risk_profile":
      return (
        <ProFormSelect
          width="lg"
          name="risk_profile"
          placeholder="Choose risk profile"
          options={RiskLevels}
        />
      );
    case "street":
      return (
        <ProFormTextArea
          width="lg"
          name="street"
          placeholder={`Enter the ${ClientInformationMap[type]}`}
        />
      );
    default:
      return (
        <ProFormText
          width="lg"
          name={type}
          placeholder={`Enter the ${ClientInformationMap[type]}`}
        />
      );
  }
}

export default function ProfileEdit() {
  const [form] = ProForm.useForm();
  const { data, updateClient } = useClient();

  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-11/12 mb-4">
        <Title className="text-base">Edit Profile</Title>
        <div className="text-base">
          <Button
            onClick={() => {
              form.setFieldsValue({
                first_name: "",
                last_name: "",
                date_of_birth: new Date(),
                nationality: "",
                identification_number: "",
                occupation: "",
                reporting_currency: "",
                tax_residency: "",
                risk_profile: "",
                email: "",
                phone_number: "",
                address: "",
                city: "",
                country: "",
                postal_code: "",
                state: "",
              });
            }}
          >
            Clear All
          </Button>
        </div>
      </div>
      <Form
        form={form}
        initialValues={data}
        layout="vertical"
        className=" w-11/12"
        onFinish={updateClient}
        onReset={() => form.resetFields()}
      >
        <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          {Object.keys(ClientInformationMap).map((key) => (
            <Form.Item
              key={key}
              label={
                ClientInformationMap[key as keyof typeof ClientInformationMap]
              }
              name={key}
            >
              <DetailsForm type={key as TFormType} />
            </Form.Item>
          ))}
        </Row>
        <Row className=" float-right flex align-middle gap-4 mt-4">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset" onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Row>
      </Form>
    </div>
  );
}
