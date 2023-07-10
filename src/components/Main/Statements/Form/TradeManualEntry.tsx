import useStatementForm from "@/hooks/useStatementForm";
import { Form, Input, InputNumber, Radio, Row } from "antd";
import SelectClient from "../../Input/SelectClient";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";
import { DatePicker } from "../../Input/DatePicker";
import SelectAssetClass from "../../Input/SelectAssetClass";
import Select from "../../Input/Select";

export default function TradeManualEntry() {
  const [form] = Form.useForm();
  const formId = useStatementForm();
  return (
    <Form
      id={formId}
      form={form}
      layout="vertical"
      className="space-y-6"
      requiredMark={false}
      size="large"
    >
      <Row className="gap-x-8">
        <Form.Item label="Client" name="client" className="flex-1">
          <SelectClient
            reset={() => {
              form.resetFields(["client"]);
            }}
            placeholder="Select the client"
          />
        </Form.Item>
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <SelectClient
            reset={() => {
              form.resetFields(["custodian"]);
            }}
            placeholder="Select the custodian"
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
        >
          <SelectRelationshipNumber
            reset={() => {
              form.resetFields(["relationship_number"]);
            }}
            placeholder="Select relationship number"
          />
        </Form.Item>
        <Form.Item
          label="Statement Date"
          name="statement_date"
          className="flex-1"
        >
          <DatePicker placeholder="Select date" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Reference Number"
          name="reference_number"
          className="flex-1"
        >
          <Input placeholder="Enter reference number" />
        </Form.Item>
        <Form.Item label="Security ID" name="security_id" className="flex-1">
          <Input placeholder="Enter security ID" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Asset Class" name="asset_class" className="flex-1">
          <SelectAssetClass placeholder="Select asset class" />
        </Form.Item>
        <Form.Item label="Trade Action" name="trade_action" className="flex-1">
          <Radio.Group className="pt-2">
            <Radio value="buy">Buy</Radio>
            <Radio value="sell">Sell</Radio>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Description" name="description" className="flex-1">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="flex-1">
          <Select placeholder="Select currency" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Cost Price" name="cost_price" className="flex-1">
          <InputNumber
            placeholder="Enter cost price"
            className="w-full"
            min={0}
          />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputNumber
            placeholder="Enter the quantity"
            className="w-full"
            min={0}
          />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Trade Date" name="trade_date" className="flex-1">
          <DatePicker placeholder="Select trade date" />
        </Form.Item>
        <Form.Item
          label="Settlement Date"
          name="settlement_date"
          className="flex-1"
        >
          <DatePicker placeholder="Select settlement date" />
        </Form.Item>
      </Row>
    </Form>
  );
}
