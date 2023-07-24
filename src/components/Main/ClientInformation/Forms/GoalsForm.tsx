"use client";

import useFormState from "@/hooks/useForm";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import revalidate from "@/lib/revalidate";
import { Form, Input, Row, Select, Spin, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AssetClassPreference = [
  { label: "Equity", value: "equity" },
  { label: "Fixed Income", value: "fixed_income" },
  { label: "Cash", value: "cash" },
  { label: "Alternative", value: "alternative" },
];

const ReturnExpectations = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

interface GoalsFormProps {
  onClose: () => void;
  id?: string;
}

type TGoal = {
  name: string;
  asset_class_preference: string;
  investment_horizon: string;
  return_expectations: string;
};

const URLs = {
  get: "/goals/{id}/",
  post: "/goals/",
  put: "/goals/{id}/",
};

function useGoal(id?: string) {
  const { get: getSearchParams } = useSearchParams();
  const { data, isLoading } = useTransactionServerQuery<TGoal>(
    id ? URLs.get.replace("{id}", id) : null
  );

  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      revalidate(`/goals/`);
      message.success("Goal Added successfully");
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });
  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", id!), {
      onSuccess: () => {
        revalidate(`/goals/`);
        message.success("Goal Updated successfully");
      },
      onError: () => {
        message.error("Something went wrong");
      },
    });
  const { formId } = useFormState({ isMutating: isMutating || isUpdating });

  return {
    data,
    formId,
    getSearchParams,
    trigger,
    update,
    isLoading,
  };
}

type TGoalFormKeys = keyof TGoal;

interface IGoalFormInputsProps {
  type: TGoalFormKeys;
  label: string;
}

function GoalFormInputs({ type, label }: IGoalFormInputsProps) {
  switch (type) {
    case "name":
      return (
        <Form.Item key={type} label={label} name={type} className="flex-1">
          <Input placeholder="Enter goal name" />
        </Form.Item>
      );
    case "asset_class_preference":
      return (
        <Form.Item key={type} label={label} name={type} className="flex-1">
          <Select
            options={AssetClassPreference}
            placeholder="Select asset class preference"
          />
        </Form.Item>
      );
    case "investment_horizon":
      return (
        <Form.Item key={type} label={label} name={type} className="flex-1">
          <Input placeholder="Enter investment horizon" />
        </Form.Item>
      );
    case "return_expectations":
      return (
        <Form.Item key={type} label={label} name={type} className="flex-1">
          <Select
            options={ReturnExpectations}
            placeholder="Select return expectations"
          />
        </Form.Item>
      );
    default:
      return null;
  }
}

export default function GoalsForm({ id, onClose }: GoalsFormProps) {
  const [form] = Form.useForm();
  const { data, formId, trigger, update, getSearchParams, isLoading } =
    useGoal(id);
  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = async (values: TGoal) => {
    const client = getSearchParams("client_id");
    if (id) {
      await update({ client, ...values });
    } else {
      await trigger({ client, ...values });
    }
    onClose();
    onReset();
  };

  const GoalFormMap: Record<keyof TGoal, string> = {
    name: "Goal Name",
    asset_class_preference: "Asset Class Preference",
    investment_horizon: "Investment Horizon",
    return_expectations: "Return Expectations",
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <Form
      id={formId}
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
      onFinish={handleSubmit}
      form={form}
      initialValues={data}
    >
      <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        {Object.entries(GoalFormMap).map(([key, label]) => (
          <GoalFormInputs key={key} label={label} type={key as TGoalFormKeys} />
        ))}
      </Row>
    </Form>
  );
}
