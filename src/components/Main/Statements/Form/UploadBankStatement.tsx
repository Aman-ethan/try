import { Form, Input, Row } from "antd";
import SelectClient from "../../Input/SelectClient";
import { DatePicker } from "../../Input/DatePicker";
import SelectCustodian from "../../Input/SelectCustodian";
import Upload from "../../Input/Upload";

export default function UploadBankStatement() {
  return (
    <Form layout="vertical" size="large" className="space-y-6">
      <Row className="gap-x-8">
        <Form.Item label="Client" name="client" className="flex-1">
          <SelectClient placeholder="Choose the client" />
        </Form.Item>
        <Form.Item label="Date" name="date" className="flex-1">
          <DatePicker placeholder="Select date" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <SelectCustodian placeholder="Choose the custodian" />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
        >
          <Input placeholder="Enter the relationship number" />
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
      <Form.Item name="statement">
        <Upload />
      </Form.Item>
    </Form>
  );
}
