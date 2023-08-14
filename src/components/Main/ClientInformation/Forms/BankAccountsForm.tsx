"use client";

import { Button, Form, FormRule, Input, Row, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import useFormState from "@/hooks/useForm";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import revalidate from "@/lib/revalidate";
import SelectCurrency from "../../Input/SelectCurrency";
import CreateCustodian from "../CreateCustodian";

interface IBankAccountFormsProps {
  onClose: () => void;
  id?: string;
}

type TBankAccount = {
  account_number: string;
  account_type: string;
  currency: string;
  relationship_number: string;
  custodian: string;
  meta: {
    relationship_manager_info: {
      name: string;
      address: string;
      phone: string;
      email: string;
    };
  };
};

const URLs = {
  get: "/bank_account/{id}/",
  post: "/bank_account/",
  put: "/bank_account/{id}/",
};

function useBankAccount(id?: string) {
  const { data, isLoading } = useTransactionServerQuery<TBankAccount>(
    id ? URLs.get.replace("{id}", id) : null
  );
  return { id, data, isLoading };
}

const BankAccountFormMap: Record<keyof TBankAccount, string> = {
  custodian: "Custodian",
  account_number: "Account Number",
  account_type: "Account Type",
  currency: "Currency",
  relationship_number: "Relationship Number",
  meta: "",
};

const ManagerFormMap: Record<
  keyof TBankAccount["meta"]["relationship_manager_info"],
  string
> = {
  name: "Name",
  address: "Address",
  phone: "Phone",
  email: "Email",
};

interface IBankAccountFormInputProps {
  type: keyof TBankAccount;
  label: string;
}

const FormRules: Partial<Record<keyof TBankAccount, FormRule[]>> = {
  account_number: [
    { required: true, message: "Please enter the account number" },
  ],
  custodian: [{ required: true, message: "Please select the custodian" }],
  relationship_number: [
    { required: true, message: "Please enter the relationship number" },
  ],
};

function BankAccountFormInput({ type, label }: IBankAccountFormInputProps) {
  switch (type) {
    case "custodian":
      return (
        <Form.Item
          name="custodian"
          label="Custodian"
          className="flex-1"
          rules={FormRules.custodian}
        >
          <CreateCustodian placeholder="Select Custodian" className="w-full" />
        </Form.Item>
      );
    case "currency":
      return (
        <Form.Item name="currency" label="Currency">
          <SelectCurrency placeholder="Select Currency" className="w-full" />
        </Form.Item>
      );
    case "meta":
      return null;
    default:
      return (
        <Form.Item
          label={label}
          name={type}
          className="flex-1"
          rules={FormRules[type]}
        >
          <Input placeholder={`Enter the ${label}`} name={type} />
        </Form.Item>
      );
  }
}

type Tkey = keyof TBankAccount;

export default function BankAccountForms({
  id,
  onClose,
}: IBankAccountFormsProps) {
  const [form] = Form.useForm();
  const [managerForm] = Form.useForm();
  const { data, isLoading } = useBankAccount(id);
  const [showRelationshipManager, setShowRelationshipManager] = useState(false);
  const { get: getSearchParams } = useSearchParams();
  const clientId = getSearchParams("client_id");

  const handleMutationSuccess = () => {
    onClose();
    form.resetFields();
    revalidate(`/bank_account/`);
    if (id) {
      revalidate(`/bank_account/${id}/`, false);
    }
  };

  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      message.success("Bank Account Added successfully");
      handleMutationSuccess();
    },
  });

  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", id!), {
      onSuccess: () => {
        message.success("Bank Account Updated successfully");
        handleMutationSuccess();
      },
    });

  const loading = isMutating || isUpdating;
  const { formId } = useFormState({ isMutating: loading });

  const onReset = useCallback(() => {
    form.resetFields();
    managerForm.resetFields();
  }, [form, managerForm]);

  useEffect(() => {
    if (data) {
      onReset();
    }
  }, [data, onReset]);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" />
      </div>
    );

  const handleSubmit = (values: TBankAccount) => {
    const payload = {
      client: clientId,
      ...values,
      meta: {
        relationship_manager_info: { ...managerForm.getFieldsValue() },
      },
    };
    if (id) {
      update(payload);
    } else {
      trigger(payload);
    }
  };

  return (
    <Form
      id={formId}
      form={form}
      initialValues={data}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
      disabled={loading}
      requiredMark={false}
    >
      <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        {Object.entries(BankAccountFormMap).map(([key, label]) => (
          <BankAccountFormInput label={label} type={key as Tkey} />
        ))}
      </Row>
      <Form
        form={managerForm}
        initialValues={data?.meta?.relationship_manager_info}
        layout="vertical"
        size="large"
        className="space-y-6 pb-20"
      >
        <Row className="gap-x-8">
          <Button
            type="primary"
            ghost
            className="mt-4 mob:grid mob:grid-cols-1"
            onClick={() => setShowRelationshipManager((prev) => !prev)}
          >
            <div className="mob:text-sm tab:text-base">
              + Relationship Manager Contact Information
            </div>
          </Button>
        </Row>
        {showRelationshipManager && (
          <Row className="grid grid-cols-1 gap-6 tab:gap-x-8 tab:gap-y-6 tab:grid-cols-2">
            {Object.entries(ManagerFormMap).map(([key, label]) => (
              <Form.Item key={key} label={label} name={key} className="flex-1">
                <Input placeholder={`Enter the ${label}`} name={key} />
              </Form.Item>
            ))}
          </Row>
        )}
      </Form>
    </Form>
  );
}
