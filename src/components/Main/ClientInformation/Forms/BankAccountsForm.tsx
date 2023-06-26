import { Form, Input, Row, Select } from "antd";
import FormActions from "../Common/FormAction";

export default function BankAccountForms() {
  return (
    <Form layout="vertical" size="large" className="space-y-6 pb-20">
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <Input placeholder="Enter custodian" />
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
          <Select placeholder="Select account type" />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="flex-1">
          <Select placeholder="Select currency" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Relationship Number" name="relationship_number">
          <Input placeholder="Enter relationship number" />
        </Form.Item>
      </Row>
      <FormActions />
    </Form>
  );
}
