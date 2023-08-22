"use client";

import { Form, Input, Row, Select, Spin, message, Tag, FormRule } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isArray } from "lodash";
import { FormInstance } from "antd/lib/form";
import useFormState from "@/hooks/useForm";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import revalidate from "@/lib/revalidate";

const AssetClassPreference = [
  { label: "Equity", value: "equity" },
  { label: "Fixed Income", value: "fixed_income" },
  { label: "Cash", value: "cash" },
  { label: "Alternative", value: "alternative" },
];

export const AssetColorMap = {
  equity: "cyan",
  fixed_income: "geekblue",
  cash: "orange",
  alternative: "red",
};

export type TAssetColorType = keyof typeof AssetColorMap;

const AssetClassMap = {
  equity: "Equity",
  fixed_income: "Fixed Income",
  cash: "Cash",
  alternative: "Alternative",
};

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
  label: string;
  asset_class_preference: TAssetColorType[] | keyof typeof AssetColorMap;
  form: FormInstance<any>;
}

const FormRules: Record<"asset_class_preference", FormRule[]> = {
  asset_class_preference: [
    { required: true, message: "Please select asset class preference" },
  ],
};

const tagRender = () => <> </>;
function GoalFormInputs({
  type,
  label,
  asset_class_preference,
  form,
}: IGoalFormInputsProps) {
  switch (type) {
    case "name":
      return (
        <Form.Item key={type} label={label} name={type} className="flex-1">
          <Input placeholder="Enter goal name" />
        </Form.Item>
      );
    case "asset_class_preference":
      return (
        <div className="relative">
          <Form.Item
            key={type}
            label={label}
            name={type}
            className="flex-1"
            rules={FormRules.asset_class_preference}
          >
            <Select
              options={AssetClassPreference}
              placeholder="Select asset class preference"
              mode="multiple"
              tagRender={tagRender}
              maxTagCount="responsive"
            />
          </Form.Item>

          {isArray(asset_class_preference) &&
            asset_class_preference?.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {asset_class_preference?.map((value: TAssetColorType) => (
                  <Tag
                    key={value}
                    color={AssetColorMap[value]}
                    closable
                    onClose={() =>
                      form.setFieldsValue({
                        asset_class_preference: asset_class_preference.filter(
                          (item: TAssetColorType) => item !== value
                        ),
                      })
                    }
                  >
                    {AssetClassMap[value]}
                  </Tag>
                ))}
              </div>
            )}
          {/* We can remove below code once backend Starts accepting multi-select */}
          {!isArray(asset_class_preference) && asset_class_preference && (
            <div style={{ marginTop: "10px" }}>
              <Tag
                key={asset_class_preference}
                color="blue"
                closable
                onClose={() =>
                  form.setFieldsValue({
                    asset_class_preference: null,
                  })
                }
              >
                {AssetClassMap[asset_class_preference]}
              </Tag>
            </div>
          )}
        </div>
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
  const assetClassValues = Form.useWatch("asset_class_preference", form);

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
      className="space-y-6"
      onFinish={handleSubmit}
      form={form}
      initialValues={data}
      requiredMark={false}
    >
      <Row className="grid grid-cols-1 gap-6 tab:grid-cols-2 tab:gap-x-8">
        {Object.entries(GoalFormMap).map(([key, label]) => (
          <GoalFormInputs
            key={key}
            label={label}
            type={key as TGoalFormKeys}
            asset_class_preference={assetClassValues}
            form={form}
          />
        ))}
      </Row>
    </Form>
  );
}
