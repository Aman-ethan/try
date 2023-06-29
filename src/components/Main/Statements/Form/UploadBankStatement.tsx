import { Form, Input, Row } from "antd";
import useStatementForm from "@/hooks/useStatementForm";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import { DatePicker } from "../../Input/DatePicker";
import Upload from "../../Input/Upload";
import SelectCustodian from "../../Input/SelectCustodian";
import SelectClient from "../../Input/SelectClient";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";

interface IUploadBankStatementResponse {
  url: string;
}

interface IUploadBankStatementForm {
  client_id: string;
  client_name: string;
  custodian_id: string;
  custodian_name: string;
  relationship_number: string;
  statement_date: string;
  file: File;
}

export default function UploadBankStatement() {
  const formId = useStatementForm();
  const [form] = Form.useForm();
  const custodian_id = Form.useWatch("custodian_id", form);
  const client_id = Form.useWatch("client_id", form);
  const { trigger } = useTransactionServerMutation<
    IUploadBankStatementForm,
    IUploadBankStatementResponse
  >("/statement/bank/upload_url/", {
    onSuccess(data) {
      fetch(data.url, {
        method: "PUT",
        body: form.getFieldValue("file"),
      });
    },
  });

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      size="large"
      className="space-y-6"
    >
      <Row className="gap-x-8">
        <Form.Item label="Client" name="client_name" className="flex-1">
          <SelectClient
            params={{ custodian_id }}
            placeholder="Choose the client"
            reset={() => {
              form.resetFields(["client_name"]);
            }}
          />
        </Form.Item>
        <Form.Item label="Date" name="statement_date" className="flex-1">
          <DatePicker placeholder="Select date" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian_name" className="flex-1">
          <SelectCustodian
            params={{ client_id }}
            placeholder="Choose the custodian"
            reset={() => {
              form.resetFields(["custodian_name"]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
        >
          <SelectRelationshipNumber
            params={{
              client_id,
              custodian_id,
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
        >
          <Input placeholder="Enter the portfolio number" />
        </Form.Item>
        <Form.Item
          label="Cash Account Number"
          name="cash_account_number"
          className="flex-1"
        >
          <Input placeholder="Enter the cash account number" />
        </Form.Item>
      </Row>
      <Form.Item name="file">
        <Upload
          beforeUpload={(file) => {
            trigger({
              ...form.getFieldsValue(),
              statement_date: form
                .getFieldValue("statement_date")
                .format(DATE_PARAM_FORMAT),
            });
            form.setFieldValue("file", file);
            return false;
          }}
        />
      </Form.Item>
    </Form>
  );
}
