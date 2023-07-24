"use client";

import Select from "@/components/Input/Select";
import useFormState from "@/hooks/useForm";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import formatInitialValues from "@/lib/formatInitialValues";
import formatTriggerValues from "@/lib/formatTriggerValues";
import revalidate from "@/lib/revalidate";
import { Form, FormRule, Input, Row, Spin, message } from "antd";
import { useEffect } from "react";
import { DatePicker } from "../../Input/DatePicker";

interface IEstatesForm {
  onClose: () => void;
  id?: string;
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

function useEstate(id?: string) {
  const { data, isLoading } = useTransactionServerQuery<TEstate>(
    `${URLs.get}${id ? `${id}/` : ""}`
  );
  return { data, isLoading };
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
  label: string;
}

const FormRules: Partial<Record<keyof TEstate, FormRule[]>> = {
  email: [{ type: "email", message: "Please enter a valid email" }],
};

function EstateFormInputs({ type, label }: IEstateFormInputsProps) {
  switch (type) {
    case "date_of_birth":
      return (
        <Form.Item label={label} name={type} className="flex-1">
          <DatePicker className="flex-1" placeholder="Select Date of Birth" />
        </Form.Item>
      );
    case "type":
      return (
        <Form.Item label={label} name={type} className="flex-1">
          <Select options={Relationship} placeholder="Select a Type" />
        </Form.Item>
      );
    default:
      return (
        <Form.Item
          label={label}
          name={type}
          className="flex-1"
          rules={type === "email" ? FormRules.email : undefined}
        >
          <Input placeholder={`Enter the ${label}`} />
        </Form.Item>
      );
  }
}

export default function EstatesForm({ onClose, id }: IEstatesForm) {
  const [form] = Form.useForm();
  const { data, isLoading } = useEstate(id);
  const { get: getSearchParams } = useSearchParams();
  const client = getSearchParams("client_id");

  const onReset = () => {
    form.resetFields();
  };

  const handleMutationSuccess = () => {
    revalidate(`/estate/`);
    onClose();
    onReset();
  };

  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      message.success("Estate Added successfully");
      handleMutationSuccess();
    },
  });
  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", id || ""), {
      onSuccess: () => {
        message.success("Estate Updated successfully");
        handleMutationSuccess();
      },
    });

  const loading = isMutating || isUpdating;
  const { formId } = useFormState({ isMutating: loading });

  useEffect(() => {
    if (data && id) {
      form.resetFields();
    }
  }, [data, form, id]);

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  const handleSubmit = async (values: TEstate) => {
    if (!client) {
      message.error("Client not found");
      return;
    }
    const payload = formatTriggerValues({ client, ...values });
    try {
      if (id) {
        await update(payload);
      } else {
        await trigger(payload);
      }
      onClose();
      onReset();
    } catch (error) {
      if (error instanceof Error) message.error(error.message);
    }
  };

  return (
    <Form
      id={formId}
      disabled={loading}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
      form={form}
      initialValues={formatInitialValues(data)}
    >
      <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        {Object.entries(EstateFormMap).map(([key, label]) => (
          <EstateFormInputs label={label} type={key as TEstateKey} />
        ))}
      </Row>
    </Form>
  );
}
