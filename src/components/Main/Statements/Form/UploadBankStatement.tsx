import { Form, FormRule, Input, Row, message } from "antd";
import useStatementForm from "@/hooks/useStatementForm";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { Dayjs } from "dayjs";
import revalidate from "@/lib/revalidate";
import { DatePicker } from "../../Input/DatePicker";
import Upload from "../../Input/Upload";
import SelectCustodian from "../../Input/SelectCustodian";
import SelectClient from "../../Input/SelectClient";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";

interface IUploadBankStatementResponse {
  url: string;
}

interface IUploadBankStatementForm {
  client: string;
  custodian: string;
  relationship_number: string;
  portfolio_number: string;
  statement_date: string;
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
    { required: true, message: "Please select a relationship number" },
  ],
  portfolio_number: [
    { required: true, message: "Please input a portfolio number" },
  ],
  s3_url: [{ required: true, message: "Please upload a file" }],
};

interface IUploadUrlResponse {
  url: string;
  s3_url: string;
}

export default function UploadBankStatement() {
  const [form] = Form.useForm();
  const custodian = Form.useWatch("custodian_id", form);
  const client = Form.useWatch("client_id", form);
  const { data, isLoading, mutate } =
    useTransactionServerQuery<IUploadUrlResponse>(
      "/statement/bank/upload_url/"
    );
  const { trigger, isMutating } = useTransactionServerMutation<
    IUploadBankStatementForm,
    IUploadBankStatementResponse
  >("/statement/bank/", {
    onSuccess: () => {
      message.success("Bank statement uploaded successfully");
      form.resetFields();
      revalidate("/statement/bank/");
    },
  });
  const formId = useStatementForm({ isMutating });

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      size="large"
      className="space-y-6"
      disabled={isMutating}
      onFinish={(values) => {
        trigger({
          ...values,
          statement_date: (values.statement_date as Dayjs).format(
            DATE_PARAM_FORMAT
          ),
          statement_type: "combined",
        });
      }}
      requiredMark={false}
    >
      <Row className="gap-x-8">
        <Form.Item
          label="Client"
          name="client_id"
          className="flex-1"
          rules={FormRules.client}
        >
          <SelectClient
            params={{ custodian_id: custodian }}
            placeholder="Choose the client"
            disabled={isMutating}
            reset={() => {
              form.resetFields(["client_id"]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Date"
          name="statement_date"
          className="flex-1"
          rules={FormRules.statement_date}
        >
          <DatePicker placeholder="Select date" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Custodian"
          name="custodian_id"
          className="flex-1"
          rules={FormRules.custodian}
        >
          <SelectCustodian
            params={{ client_id: client }}
            placeholder="Choose the custodian"
            disabled={isMutating}
            reset={() => {
              form.resetFields(["custodian_id"]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
          rules={FormRules.relationship_number}
        >
          <SelectRelationshipNumber
            disabled={isMutating}
            params={{
              client_id: client,
              custodian_id: custodian,
            }}
            reset={() => {
              form.resetFields(["relationship_number"]);
            }}
            placeholder="Enter the relationship number"
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Portfolio Number"
          name="portfolio_number"
          className="flex-1"
          rules={FormRules.portfolio_number}
        >
          <Input placeholder="Enter the portfolio number" />
        </Form.Item>
      </Row>
      <Form.Item name="s3_url" rules={FormRules.s3_url}>
        <Upload
          action={data?.url}
          disabled={isLoading || isMutating}
          onChange={({ file }) => {
            if (file.status === "error") {
              form.setFieldValue("s3_url", data?.s3_url);
              mutate();
            }
          }}
        />
      </Form.Item>
    </Form>
  );
}
