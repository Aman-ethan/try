"use client";

import { Form, message, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import revalidate from "@/lib/revalidate";
import FormActions from "../Common/FormAction";

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

  const { trigger } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      message.success("Goal Added successfully");
      revalidate(`/goals/`);
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });
  const { trigger: update } = useTransactionServerPutMutation(
    URLs.put.replace("{id}", goalId!),
    {
      onSuccess: () => {
        message.success("Goal Updated successfully");
        revalidate(`/goals/`);
      },
      onError: () => {
        message.error("Something went wrong");
      },
    }
  );
  return { data, goalId, getSearchParams, trigger, update };
}

type TGoalFormKeys = keyof TGoal;

interface IGoalFormInputsProps {
  type: TGoalFormKeys;
}

function GoalFormInputs({ type }: IGoalFormInputsProps) {
  switch (type) {
    case "name":
      return <ProFormText placeholder="Enter goal name" name="name" />;
    case "asset_class_preference":
      return (
        <ProFormSelect
          options={AssetClassPreference}
          placeholder="Select asset class preference"
          name="asset_class_preference"
        />
      );
    case "investment_horizon":
      return (
        <ProFormText
          placeholder="Enter investment horizon"
          name="investment_horizon"
        />
      );
    case "return_expectations":
      return (
        <ProFormSelect
          options={ReturnExpectations}
          placeholder="Select return expectations"
          name="return_expectations"
        />
      );
    default:
      return null;
  }
}

export default function GoalsForm({ onClose }: GoalsFormProps) {
  const [form] = Form.useForm();
  const { data, goalId, trigger, update, getSearchParams } = useGoal();

  const client = getSearchParams("client_id");

  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values: TGoal) => {
    if (goalId) {
      update({ client, ...values });
    } else {
      trigger({ client, ...values });
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
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
      onFinish={handleSubmit}
      form={form}
      initialValues={data}
    >
      <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        {Object.entries(GoalFormMap).map(([key, label]) => (
          <Form.Item key={key} label={label} name={key} className="flex-1">
            <GoalFormInputs type={key as TGoalFormKeys} />
          </Form.Item>
        ))}
      </Row>
      <FormActions onClick={onReset} />
    </Form>
  );
}
