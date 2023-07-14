"use client";

import {
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, message, Row } from "antd";
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
  const client_id = getSearchParams("client");
  const { data, isLoading } = useTransactionServerQuery<TClient>(
    `/client/${client_id}/`
  );

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
    isLoading,
    updateClient,
  };
}

export default function ProfileEdit() {
  const [form] = ProForm.useForm();
  const { data, isLoading, updateClient } = useClient();

  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  return (
    <ProForm
      form={form}
      loading={isLoading}
      initialValues={data}
      onFinish={async (values) => {
        updateClient(values);
      }}
      onReset={() => form.resetFields()}
    >
      <Row className="w-10/12 flex-initial items-center justify-between">
        <Title className="m-7">Edit Profile</Title>
        <Button
          onClick={() =>
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
            })
          }
        >
          Clear All
        </Button>
      </Row>
      <ProForm.Group style={{ margin: "2em" }}>
        <ProFormText width="lg" name="first_name" label="First Name" />
        <ProFormText width="lg" name="last_name" label="Last Name" />
      </ProForm.Group>
      <ProForm.Group style={{ margin: "2em" }}>
        <ProFormDatePicker
          width="lg"
          name="date_of_birth"
          label="Date Of Birth"
          placeholder="Choose Date Of Birth"
        />
        <ProFormText width="lg" name="nationality" label="Nationality" />
      </ProForm.Group>
      <ProForm.Group style={{ margin: "2em" }}>
        <ProFormText
          width="lg"
          name="identification_number"
          label="Identification Number"
          fieldProps={{
            style: {
              marginBottom: "1em",
            },
          }}
        />
        <ProFormText width="lg" name="occupation" label="Occupation" />
        <ProFormText
          width="lg"
          name="reporting_currency"
          label="RPT Currency"
        />
      </ProForm.Group>
      <ProForm.Group style={{ margin: "2em" }}>
        <ProFormText
          width="lg"
          name="tax_residency"
          label="Tax Residency"
          fieldProps={{
            style: {
              marginBottom: "1em",
            },
          }}
        />
        <ProFormSelect
          width="lg"
          name="risk_profile"
          label="Risk Profile"
          placeholder="Choose risk profile"
          options={RiskLevels}
        />
        <ProFormText
          width="lg"
          name="email"
          label="Email"
          rules={[{ type: "email" }]}
        />
      </ProForm.Group>
      <ProForm.Group style={{ margin: "2em" }}>
        <ProFormText width="lg" name="phone_number" label="Phone Number" />
        <ProFormTextArea width="lg" name="address" label="Address" />
        <ProFormText width="lg" name="city" label="City" />
      </ProForm.Group>
      <ProForm.Group style={{ margin: "2em" }}>
        <ProFormText width="lg" name="postal_code" label="Postal Code" />
        <ProFormText width="lg" name="country" label="Country" />
      </ProForm.Group>
    </ProForm>
  );
}
