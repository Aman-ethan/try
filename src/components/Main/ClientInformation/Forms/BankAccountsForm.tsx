"use client";

import { Button, Form, message, Row } from "antd";
import { useEffect, useState, useCallback } from "react";
import { ProFormText } from "@ant-design/pro-components";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import revalidate from "@/lib/revalidate";
import SelectCurrency from "../../Input/SelectCurrency";
import FormActions from "../Common/FormAction";
import CreateCustodian from "../CreateCustodian";

interface IBankAccountFormsProps {
  onClose: () => void;
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

function useBankAccount() {
  const { get: getSearchParams } = useSearchParams();
  const bankAccountId = getSearchParams("bank_account_id");
  const { data } = useTransactionServerQuery<TBankAccount>(
    bankAccountId ? URLs.get.replace("{id}", bankAccountId) : null
  );
  return { bankAccountId, data, getSearchParams };
}

const BankAccountFormMap: Record<keyof TBankAccount, string> = {
  account_number: "Account Number",
  account_type: "Account Type",
  currency: "Currency",
  relationship_number: "Relationship Number",
  custodian: "Custodian",
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
}

function BankAccountFormInput({ type }: IBankAccountFormInputProps) {
  switch (type) {
    case "custodian":
      return (
        <Form.Item name="custodian" className="flex-1">
          <CreateCustodian placeholder="Select Custodian" />
        </Form.Item>
      );
    case "currency":
      return (
        <Form.Item name="currency">
          <SelectCurrency placeholder="Select Currency" />
        </Form.Item>
      );
    case "meta":
      return null;
    default:
      return (
        <ProFormText
          name={type}
          placeholder={`Enter ${BankAccountFormMap[type]}`}
        />
      );
  }
}

type Tkey = keyof TBankAccount;

export default function BankAccountForms({ onClose }: IBankAccountFormsProps) {
  const [form] = Form.useForm();
  const [managerForm] = Form.useForm();
  const { bankAccountId, data, getSearchParams } = useBankAccount();
  const [showRelationshipManager, setShowRelationshipManager] = useState(false);
  const clientId = getSearchParams("client_id");

  const handleMutationSuccess = () => {
    onClose();
    form.resetFields();
    revalidate(`/bank_account/`);
  };

  const { trigger } = useTransactionServerMutation(URLs.post, {
    onSuccess: () => {
      message.success("Bank Account Added successfully");
      handleMutationSuccess();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { trigger: update } = useTransactionServerPutMutation(
    URLs.put.replace("{id}", bankAccountId!),
    {
      onSuccess: () => {
        message.success("Bank Account Updated successfully");
        handleMutationSuccess();
      },
      onError: (error) => {
        message.error(error.message);
      },
    }
  );

  const handleSubmit = (values: TBankAccount) => {
    const payload = {
      client: clientId,
      ...values,
      meta: {
        relationship_manager_info: { ...managerForm.getFieldsValue() },
      },
    };
    if (bankAccountId) {
      update(payload);
    } else {
      trigger(payload);
    }
  };

  const onReset = useCallback(() => {
    form.resetFields();
    managerForm.resetFields();
  }, [form, managerForm]);

  useEffect(() => {
    if (data) {
      onReset();
    }
  }, [data, onReset]);

  return (
    <Form
      form={form}
      initialValues={data}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
    >
      <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        {Object.entries(BankAccountFormMap).map(([key, value]) => (
          <Form.Item label={value} name={key} className="flex-1">
            <BankAccountFormInput type={key as Tkey} />
          </Form.Item>
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
          <Row className="grid grid-cols-1 gap-4 tab:grid-cols-2">
            {Object.entries(ManagerFormMap).map(([key, label]) => (
              <Form.Item key={key} label={label} name={key} className="flex-1">
                <ProFormText placeholder={`Enter the ${label}`} name={key} />
              </Form.Item>
            ))}
          </Row>
        )}
      </Form>
      <FormActions onClick={onReset} />
    </Form>
  );
}
