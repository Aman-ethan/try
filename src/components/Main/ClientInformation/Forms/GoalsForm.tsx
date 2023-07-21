"use client";

import useFormState from "@/hooks/useForm";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import revalidate from "@/lib/revalidate";
import { Form, Input, Row, Select, message } from "antd";
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

function useGoal() {
  const { get: getSearchParams } = useSearchParams();
  const goalId = getSearchParams("goal_id");
  const { data } = useTransactionServerQuery<TGoal>(
    goalId ? URLs.get.replace("{id}", goalId) : null
  );

  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      message.success("Goal Added successfully");
      revalidate(`/goals/`);
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });
  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", goalId!), {
      onSuccess: () => {
        message.success("Goal Updated successfully");
        revalidate(`/goals/`);
      },
      onError: () => {
        message.error("Something went wrong");
      },
    });
  const { formId } = useFormState({ isMutating: isMutating || isUpdating });

  return { data, formId, goalId, getSearchParams, trigger, update };
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

export default function GoalsForm({ onClose }: GoalsFormProps) {
  const [form] = Form.useForm();
  const { data, formId, goalId, trigger, update, getSearchParams } = useGoal();

  const client = getSearchParams("client_id");

  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = async (values: TGoal) => {
    if (goalId) {
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
          <GoalFormInputs label={label} type={key as TGoalFormKeys} />
        ))}
      </Row>
    </Form>
  );
}
