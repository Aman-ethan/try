import { Form, FormRule, Input, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import type { Dayjs } from "dayjs";
import { formWrapper } from "@/constants/strings";
import useFormState from "@/hooks/useForm";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import formatTriggerValues from "@/lib/formatTriggerValues";
import getFileValueFromEvent from "@/lib/getFileValueFromEvent";
import revalidate from "@/lib/revalidate";
import { DatePicker } from "../../Input/DatePicker";
import SelectClient from "../../Input/SelectClient";
import SelectRelationshipNumber from "../../Input/SelectRelationshipNumber";
import Upload from "../../Input/Upload";
import SelectStatementType from "../Input/SelectStatementType";
import CreateCustodian from "../../ClientInformation/CreateCustodian";

interface IUploadBankStatementResponse {
  url: string;
}

interface IUploadBankStatementForm {
  client: string;
  custodian: string;
  relationship_number: string;
  portfolio_number: string;
  statement_date: Dayjs;
  s3_url: string;
  statement_type: string;
}

const FormRules: Partial<Record<keyof IUploadBankStatementForm, FormRule[]>> = {
  client: [{ required: true, message: "Please select a client" }],
  custodian: [{ required: true, message: "Please select a custodian" }],
  statement_date: [
    { required: true, message: "Please select a statement date" },
  ],
  relationship_number: [
    { required: true, message: "Please select an account number" },
  ],
  portfolio_number: [
    { required: false, message: "Please input a portfolio number" },
  ],
  s3_url: [{ required: true, message: "Please upload a file" }],
  statement_type: [
    { required: true, message: "Please select a statement type" },
  ],
};

interface IUploadUrlResponse {
  url: string;
  s3_url: string;
}

const URLs = {
  get: "/statement/bank/",
};

export default function UploadBankStatement() {
  const [form] = Form.useForm();
  const custodianId = Form.useWatch("custodian", form);
  const clientId = Form.useWatch("client", form);

  const { data, isLoading, mutate } =
    useTransactionServerQuery<IUploadUrlResponse>(`${URLs.get}upload_url/`, {
      revalidateOnFocus: false,
      refreshInterval: 3600 * 1000,
    });

  const { trigger, isMutating } = useTransactionServerMutation<
    IUploadBankStatementForm,
    IUploadBankStatementResponse
  >(URLs.get, {
    onSuccess: () => {
      message.success("Bank statement uploaded successfully");
      form.resetFields();
      revalidate(URLs.get);
    },
  });
  const { formId } = useFormState({ isMutating });

  const onFileChange = ({ file }: UploadChangeParam<UploadFile>) => {
    switch (file.status) {
      case "done":
        form.setFieldValue("s3_url", data?.s3_url);
        form.validateFields(["s3_url"]);
        mutate();
        break;
      default:
        form.setFieldValue("s3_url", undefined);
    }
  };

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      size="large"
      className="space-y-6"
      disabled={isMutating}
      onFinish={({ file: _, ...values }) =>
        trigger(formatTriggerValues(values) as IUploadBankStatementForm)
      }
      requiredMark={false}
    >
      <div className={formWrapper}>
        <Form.Item
          label="Client"
          className="w-full tab:w-1/2 tab:pr-4"
          name="client"
          rules={FormRules.client}
        >
          <SelectClient
            params={{ custodianId }}
            placeholder="Choose the client"
            disabled={isMutating}
            reset={() => {
              form.resetFields(["client"]);
            }}
            className="w-full"
          />
        </Form.Item>
      </div>
      <div className={formWrapper}>
        <Form.Item
          label="Statement Type"
          name="statement_type"
          className="min-w-0 flex-1"
          rules={FormRules.statement_type}
        >
          <SelectStatementType
            placeholder="Select statement type"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="Date"
          name="statement_date"
          className="min-w-0 flex-1"
          rules={FormRules.statement_date}
        >
          <DatePicker placeholder="Select date" />
        </Form.Item>
      </div>
      <div className={formWrapper}>
        <Form.Item
          label="Custodian"
          name="custodian"
          className="min-w-0 flex-1"
          rules={FormRules.custodian}
        >
          <CreateCustodian
            params={{ clientId }}
            placeholder="Choose the custodian"
            disabled={isMutating}
            reset={() => {
              form.resetFields(["custodian"]);
            }}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="Account Number"
          name="relationship_number"
          className="min-w-0 flex-1"
          rules={FormRules.relationship_number}
        >
          <SelectRelationshipNumber
            disabled={isMutating}
            params={{
              clientId,
              custodianId,
            }}
            reset={() => {
              form.resetFields(["relationship_number"]);
            }}
            placeholder="Enter the account number"
            className="w-full"
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Form.Item
          name="file"
          valuePropName="fileList"
          getValueFromEvent={getFileValueFromEvent}
        >
          <Upload
            accept=".pdf"
            action={data?.url}
            disabled={isLoading || isMutating}
            onChange={onFileChange}
          />
        </Form.Item>
        <Form.Item name="s3_url" rules={FormRules.s3_url} noStyle>
          <Input hidden />
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
