import useStatementForm from "@/hooks/useStatementForm";
import { Form, Input, InputNumber, Row } from "antd";
import SelectClient from "../../Input/SelectClient";
import { DatePicker } from "../../Input/DatePicker";
import SelectAssetClass from "../../Input/SelectAssetClass";
import SelectCustodian from "../../Input/SelectCustodian";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";
import Select from "../../Input/Select";

export default function PositionManualEntry() {
  const formId = useStatementForm();
  return (
    <Form id={formId} layout="vertical" size="large" className="space-y-6">
      <Row className="gap-x-8">
        <Form.Item label="Client" name="client" className="flex-1">
          <SelectClient placeholder="Select client" />
        </Form.Item>
        <Form.Item
          label="Statement Date"
          name="statement_date"
          className="flex-1"
        >
          <DatePicker />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Asset Class" name="asset_class" className="flex-1">
          <SelectAssetClass placeholder="Select asset class" />
        </Form.Item>
        <Form.Item label="ISIN" name="isin" className="flex-1">
          <Input placeholder="Enter ISIN" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Custodian" name="custodian" className="flex-1">
          <SelectCustodian placeholder="Select custodian" />
        </Form.Item>
        <Form.Item
          label="Relationship Number"
          name="relationship_number"
          className="flex-1"
        >
          <SelectRelationshipNumber placeholder="Select relationship number" />
        </Form.Item>
      </Row>
      <Form.Item label="Description">
        <Input placeholder="Enter description" />
      </Form.Item>
      <Row className="gap-x-8">
        <Form.Item
          label="Original Currency"
          name="original_currency"
          className="flex-1"
        >
          <Select placeholder="Select original currency" />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputNumber className="w-full" placeholder="Enter the quantity" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Cost Price" name="cost_price" className="flex-1">
          <InputNumber className="w-full" placeholder="Enter cost price" />
        </Form.Item>
        <Form.Item label="MTM Price" name="mtm_price" className="flex-1">
          <InputNumber className="w-full" placeholder="Enter MTM price" />
        </Form.Item>
      </Row>
      <Form.Item label="Accrued Interest" name="accrued_interest">
        <InputNumber className="w-full" placeholder="Enter accrued interest" />
      </Form.Item>
    </Form>
  );
}
