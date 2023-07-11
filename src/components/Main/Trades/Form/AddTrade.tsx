import { Form, Input, InputNumber, Radio, Row } from "antd";
import SelectClient from "../../Input/SelectClientWithParams";
import { DatePicker } from "../../Input/DatePicker";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import AddSecurity from "../General/AddSecurity";
import Select from "../../Input/Select";
import SelectAssetClass from "../../Input/SelectAssetClass";
import SelectRelationshipNumber from "../../Statements/Input/SelectRelationshipNumber";
import TradeAction from "../../Input/TradeAction";
import useForm from "@/hooks/useForm";

export default function AddTrade() {
  const formId = useForm();
  return (
    <Form id={formId} layout="vertical" size="large" className="space-y-6">
      <Form.Item label="Client" name="client" className="w-1/2 pr-4">
        <SelectClient placeholder="Choose the client" />
      </Form.Item>
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <SelectCustodian placeholder="Choose the custodian" />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
        >
          <SelectRelationshipNumber placeholder="Enter the relationship number" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="Security" name="security" className="w-1/2 pr-4">
          <Input placeholder="Enter the security" />
        </Form.Item>
        <Form.Item label="&nbsp;" className="w-1/2">
          <AddSecurity />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Security ID" name="security_id" className="flex-1">
          <Input placeholder="Security ID" disabled />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="flex-1">
          <Select placeholder="Currency" disabled />
        </Form.Item>
        <Form.Item label="Asset Type" name="asset_type" className="flex-1">
          <SelectAssetClass placeholder="Asset Type" disabled />
        </Form.Item>
      </Row>
      <Form.Item label="Trade Action" name="trade_action" className="w-1/2">
        <TradeAction />
      </Form.Item>
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
      <Row className="gap-x-8">
        <Form.Item label="Goal" name="goal" className="flex-1">
          <Select placeholder="Enter the goal" />
        </Form.Item>
        <Form.Item label="Tags" name="tags" className="flex-1">
          <Input placeholder="Enter the tags" />
        </Form.Item>
      </Row>
    </Form>
  );
}
