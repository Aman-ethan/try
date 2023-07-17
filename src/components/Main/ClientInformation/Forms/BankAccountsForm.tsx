"use client";

import { Button, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { flags } from "@/constants/flags";
import revalidate from "@/lib/revalidate";
import FormActions from "../Common/FormAction";
import CreateCustodian from "../CreateCustodian";
import CurrencyTag, { Currency } from "../../General/CurrencyTag";

interface IBankAccountFormsProps {
  onClose: () => void;
}

type TCustodianType = {
  id: string;
  name: string;
};

type TBankAccount = {
  account_number: string;
  account_type: string;
  currency: string;
  relationship_number: string;
  custodian: TCustodianType;
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

const currencyOptions = Object.keys(flags).map((key) => ({
  label: key,
  value: key as Currency,
}));

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

  useEffect(() => {
    if (data) {
      form.resetFields();
    }
  }, [data, form]);

  const onReset = () => {
    form.resetFields();
  };

  const { Option } = Select;

  return (
    <Form
      form={form}
      initialValues={data}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="space-y-6 pb-20"
    >
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <CreateCustodian placeholder="Select Custodian" />
        </Form.Item>
        <Form.Item
          label="Account Number"
          name="account_number"
          className="flex-1"
        >
          <Input placeholder="Enter account number" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Account Type" name="account_type" className="flex-1">
          {/* <Select placeholder="Select account type" /> */}
          <Input placeholder="Enter account type" />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="flex-1">
          <Select
            maxLength={1}
            placeholder="Select currency"
            showSearch
            allowClear
          >
            {currencyOptions.map((item) => (
              <Option value={item.value} label={item.label}>
                <div className="mt-2 flex items-center">
                  <CurrencyTag currency={item.value} />
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className=" w-1/2"
        >
          <Input placeholder="Enter relationship number" />
        </Form.Item>
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
            className="mt-4"
            onClick={() => setShowRelationshipManager((prev) => !prev)}
          >
            + Relationship Manager Contact Information
          </Button>
        </Row>
        {showRelationshipManager && (
          <>
            <Row className="gap-x-8">
              <Form.Item label="Name" name="name" className="flex-1">
                <Input placeholder="Enter the name" />
              </Form.Item>
              <Form.Item label="Address" name="address" className="flex-1">
                <Input placeholder="Enter the address" />
              </Form.Item>
            </Row>
            <Row className="gap-x-8">
              <Form.Item label="Phone Number" name="phone" className="flex-1">
                <Input placeholder="Enter the phone number" />
              </Form.Item>
              <Form.Item label="Email address" name="email" className="flex-1">
                <Input placeholder="Enter the email address" />
              </Form.Item>
            </Row>
          </>
        )}
      </Form>
      <FormActions onClick={onReset} />
    </Form>
  );
}
