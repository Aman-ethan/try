"use client";

import { Form, Input, Row, Spin, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useFormState from "@/hooks/useForm";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import revalidate from "@/lib/revalidate";
import Select from "@/components/Input/Select";
import SelectAssetPreference from "../SelectAssetPreference";

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

  const handleMutationSuccess = (msg: string) => {
    revalidate(`/goals/`);
    message.success(msg);
  };

  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      handleMutationSuccess("Goal Added successfully");
    },
  });

  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", id!), {
      onSuccess: () => {
        handleMutationSuccess("Goal Updated successfully");
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
}

function GoalFormInputs({ type }: IGoalFormInputsProps) {
  switch (type) {
    case "name":
      return <Input placeholder="Enter goal name" />;
    case "asset_class_preference":
      return (
        <SelectAssetPreference
          name={type}
          placeholder="Select asset class preference"
        />
      );
    case "investment_horizon":
      return <Input placeholder="Enter investment horizon" />;
    case "return_expectations":
      return (
        <Select
          options={ReturnExpectations}
          placeholder="Select return expectations"
        />
      );
    default:
      return null;
  }
}

const GoalFormMap: Record<keyof TGoal, string> = {
  name: "Goal Name",
  asset_class_preference: "Asset Class Preference",
  investment_horizon: "Investment Horizon",
  return_expectations: "Return Expectations",
};

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
    if (
      !values.asset_class_preference ||
      values.asset_class_preference.length === 0
    ) {
      message.error("Please select asset class preference");
      return;
    }
    const client = getSearchParams("client_id");
    if (id) {
      await update({ client, ...values });
    } else {
      await trigger({ client, ...values });
    }
    onClose();
    onReset();
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
      className="space-y-6"
      onFinish={handleSubmit}
      form={form}
      initialValues={data}
      requiredMark={false}
    >
      <Row className="grid grid-cols-1 gap-6 tab:grid-cols-2 tab:gap-x-8">
        {Object.entries(GoalFormMap).map(([key, label]) => (
          <Form.Item key={key} label={label} name={key} className="flex-1">
            <GoalFormInputs type={key as TGoalFormKeys} />
          </Form.Item>
        ))}
      </Row>
    </Form>
  );
}
