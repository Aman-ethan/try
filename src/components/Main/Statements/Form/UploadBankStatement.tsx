import { Form, FormRule, Row, message } from "antd";
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
import SelectPortfolioNumber from "../Input/SelectPortfolioNumber";
import SelectStatementType from "../Input/SelectStatementType";

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
  statement_type: [
    { required: true, message: "Please select a statement type" },
  ],
};

interface IUploadUrlResponse {
  url: string;
  s3_url: string;
}

export default function UploadBankStatement() {
  const [form] = Form.useForm();
  const custodianId = Form.useWatch("custodian", form);
  const clientId = Form.useWatch("client", form);
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
        });
      }}
      requiredMark={false}
    >
      <Row className="gap-x-8">
        <Form.Item
          label="Client"
          name="client"
          className="flex-1"
          rules={FormRules.client}
        >
          <SelectClient
            params={{ custodianId }}
            placeholder="Choose the client"
            disabled={isMutating}
            reset={() => {
              form.resetFields(["client"]);
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
          name="custodian"
          className="flex-1"
          rules={FormRules.custodian}
        >
          <SelectCustodian
            params={{ clientId }}
            placeholder="Choose the custodian"
            disabled={isMutating}
            reset={() => {
              form.resetFields(["custodian"]);
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
              clientId,
              custodianId,
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
          <SelectPortfolioNumber
            placeholder="Select the portfolio number"
            params={{
              clientId,
              custodianId,
            }}
            reset={() => {
              form.resetFields(["portfolio_number"]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Statement Type"
          name="statement_type"
          className="flex-1"
          rules={FormRules.statement_type}
        >
          <SelectStatementType placeholder="Select statement type" />
        </Form.Item>
      </Row>
      <Form.Item name="file" rules={FormRules.s3_url}>
        <Upload
          action={data?.url}
          disabled={isLoading || isMutating}
          onChange={({ file }) => {
            if (file.status === "done") {
              form.setFieldValue("s3_url", data?.s3_url);
              mutate();
            }
          }}
        />
      </Form.Item>
    </Form>
  );
}
