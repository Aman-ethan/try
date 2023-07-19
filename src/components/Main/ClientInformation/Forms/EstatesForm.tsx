"use client";

import { Form, message, Row } from "antd";
import { useEffect } from "react";
import {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import revalidate from "@/lib/revalidate";
import formatTriggerValues from "@/lib/formatTriggerValues";
import FormActions from "../Common/FormAction";

interface IEstatesForm {
  onClose: () => void;
}

type TEstate = {
  type: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  relationship: string;
  percent_share: string;
};

const Relationship = [
  { label: "Nominee", value: "nominee" },
  { label: "Beneficiary (Trust)", value: "beneficiary_trust" },
  { label: "Beneficiary (Person)", value: "beneficiary_person" },
];

const URLs = {
  get: "/estate/",
  post: "/estate/",
  put: "/estate/{id}/",
};

function useEstate() {
  const { get: getSearchParams } = useSearchParams();
  const estateId = getSearchParams("estate_id");
  const { data } = useTransactionServerQuery<TEstate>(
    `${URLs.get}${estateId ? `${estateId}/` : ""}`
  );
  return { data, getSearchParams, estateId };
}

const EstateFormMap: Record<keyof TEstate, string> = {
  type: "Type",
  name: "Name",
  email: "Email",
  phone: "Phone",
  date_of_birth: "Date of Birth",
  relationship: "Relationship",
  percent_share: "Percent Share",
};
type TEstateKey = keyof TEstate;
interface IEstateFormInputsProps {
  type: TEstateKey;
}

function EstateFormInputs({ type }: IEstateFormInputsProps) {
  switch (type) {
    case "date_of_birth":
      return (
        /* Not able to use General Date picker , getting error in Date picker */
        <ProFormDatePicker
          name="date_of_birth"
          className="flex-1"
          fieldProps={{
            style: { width: "100%" },
          }}
          placeholder="Select Date of Birth"
        />
      );
    case "type":
      return (
        <ProFormSelect
          name="type"
          options={Relationship}
          placeholder="Select a Type"
        />
      );
    default:
      return (
        <ProFormText
          name={type}
          placeholder={`Enter the ${EstateFormMap[type]}`}
        />
      );
  }
}

export default function EstatesForm({ onClose }: IEstatesForm) {
  const [form] = Form.useForm();
  const { data, estateId, getSearchParams } = useEstate();

  const onReset = () => {
    form.resetFields();
  };

  const handleMutationSuccess = () => {
    revalidate(`/estate/`);
    onClose();
    onReset();
  };

  const { trigger } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      message.success("Estate Added successfully");
      handleMutationSuccess();
    },
  });
  const { trigger: update } = useTransactionServerPutMutation(
    URLs.put.replace("{id}", estateId || ""),
    {
      onSuccess: () => {
        message.success("Estate Updated successfully");
        handleMutationSuccess();
      },
    }
  );
  const client = getSearchParams("client_id");

  useEffect(() => {
    if (data && estateId) {
      form.resetFields();
    }
  }, [data, form, estateId]);

  const handleSubmit = (values: TEstate) => {
    if (!client) {
      message.error("Client not found");
      return;
    }
    const payload = formatTriggerValues({ client, ...values });
    if (estateId) {
      update(payload);
    } else {
      trigger(payload);
    }
    onClose();
    onReset();
  };

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
      onReset={onReset}
      form={form}
      initialValues={data}
    >
      <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        {Object.entries(EstateFormMap).map(([key, value]) => (
          <Form.Item label={value} name={key} key={key} className="flex-1">
            <EstateFormInputs type={key as TEstateKey} />
          </Form.Item>
        ))}
      </Row>
      <FormActions onClick={onReset} />
    </Form>
  );
}
