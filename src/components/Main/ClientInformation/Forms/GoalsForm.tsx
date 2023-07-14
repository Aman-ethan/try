"use client";

import { Form, Input, message, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import Select from "@/components/Input/Select";
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
  asset_class_preference: string;
  investment_horizon: string;
  liquidity_needs: string;
  return_expectations: string;
  holding_period: string;
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
  });
  const { trigger: update } = useTransactionServerPutMutation(
    URLs.put.replace("{id}", goalId!),
    {
      onSuccess: () => {
        message.success("Goal Updated successfully");
        revalidate(`/goals/`);
      },
    }
  );
  return { data, goalId, getSearchParams, trigger, update };
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

  return (
    <Form
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
      onFinish={handleSubmit}
      form={form}
      initialValues={data}
    >
      <Row className="gap-x-8">
        <Form.Item label="Goal Name" name="name" className="flex-1">
          <Input placeholder="Enter goal name" />
        </Form.Item>
        <Form.Item
          label="Asset Class Preference"
          name="asset_class_preference"
          className="flex-1"
        >
          <Select
            placeholder="Select asset class preference"
            options={AssetClassPreference}
          />
        </Form.Item>
      </Row>

      <Row className="gap-x-8">
        <Form.Item
          label="Investment Horizon"
          name="investment_horizon"
          className="flex-1"
        >
          <Input placeholder="Enter investment horizon" />
        </Form.Item>
        <Form.Item
          label="Return Expectations"
          name="return_expectations"
          className="flex-1"
        >
          <Select
            placeholder="Select return expectations"
            options={ReturnExpectations}
          />
        </Form.Item>
      </Row>
      <FormActions onClick={onReset} />
    </Form>
  );
}
