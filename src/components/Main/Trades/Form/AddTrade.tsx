import { Button, Form, Input, InputNumber, Row } from "antd";
import SelectClient from "../../Input/SelectClient";
import { DatePicker } from "../../Input/DatePicker";
import SelectCustodian from "../../Input/SelectCustodian";
import AddSecurity from "../General/AddSecurity";
import DrawerAction from "../../General/DrawerAction";

export default function AddTrade() {
  return (
    <Form layout="vertical" size="large" className="space-y-6 pb-20">
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
      <Row className="gap-x-4">
        <Form.Item label="Security" name="security" className="flex-1">
          <Input placeholder="Enter the security" />
        </Form.Item>
        <Form.Item label="&nbsp;">
          <AddSecurity />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Security ID" name="security_id" className="flex-1">
          <Input placeholder="Security ID" disabled />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="flex-1">
          <Input placeholder="Currency" disabled />
        </Form.Item>
        <Form.Item label="Asset Type" name="asset_type" className="flex-1">
          <Input placeholder="Asset Type" disabled />
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
      <Row className="gap-x-8">
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputNumber
            className="w-full"
            placeholder="Enter the quantity of asset"
          />
        </Form.Item>
        <Form.Item label="Price" name="price" className="flex-1">
          <InputNumber
            className="w-full"
            placeholder="Enter the price of trade"
          />
        </Form.Item>
      </Row>
      <Form.Item label="Add Tag" name="tags" className="w-1/2 pr-4">
        <Input placeholder="Add some tags" />
      </Form.Item>
    </Form>
  );
}
