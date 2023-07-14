"use client";

import { Form, Input, message, Row } from "antd";
import { useEffect } from "react";
import Select from "@/components/Input/Select";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import revalidate from "@/lib/revalidate";
import formatTriggerValues from "@/lib/formatTriggerValues";
import FormActions from "../Common/FormAction";
import { DatePicker } from "../../Input/DatePicker";

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
  put: "/estate/{id}/}",
};

function useEstate() {
  const { get: getSearchParams } = useSearchParams();
  const estateId = getSearchParams("estate_id");
  const { data } = useTransactionServerQuery<TEstate>(
    `${URLs.get}${estateId ? `${estateId}/` : ""}`
  );
  return { data, getSearchParams, estateId };
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
      <Row className="gap-x-8">
        <Form.Item label="Type" name="type" className="flex-1">
          <Select placeholder="Select type" options={Relationship} />
        </Form.Item>
        <Form.Item label="Name" name="name" className="flex-1">
          <Input placeholder="Enter name" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email" }]}
          className="flex-1"
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone" className="flex-1">
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          className="flex-1"
        >
          <DatePicker className="flex-1" placeholder="Select Date of Birth" />
        </Form.Item>
        <Form.Item label="Relationship" name="relationship" className="flex-1">
          <Input placeholder="Enter Relationship" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="% Share" name="percent_share">
          <Input placeholder="Enter the share" />
        </Form.Item>
      </Row>
      <FormActions onClick={onReset} />
    </Form>
  );
}
