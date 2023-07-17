import useForm from "@/hooks/useForm";
import { IStatementForm } from "@/interfaces/Main";
import formatInitialValues from "@/lib/formatInitialValues";
import formatTriggerValues from "@/lib/formatTriggerValues";
import { Form, Input, Row } from "antd";
import { DatePicker } from "../../Input/DatePicker";
import InputPrice from "../../Input/InputPrice";
import InputQuantity from "../../Input/InputQuantity";
import SelectAssetClass from "../../Input/SelectAssetClass";
import SelectClient from "../../Input/SelectClient";
import SelectCurrency from "../../Input/SelectCurrency";
import SelectCustodian from "../../Input/SelectCustodian";
import TradeAction from "../../Input/TradeAction";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";

export default function TradeStatementForm({
  form,
  initialValues,
  trigger,
  isMutating,
}: IStatementForm) {
  const { formId } = useForm({ isMutating });
  return (
    <Form
      id={formId}
      form={form}
      onFinish={(values) => {
        trigger(formatTriggerValues(values));
      }}
      initialValues={formatInitialValues(initialValues)}
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
          <SelectCustodian
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
        <Form.Item label="Security ID" name="isin" className="flex-1">
          <Input placeholder="Enter security ID" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Asset Class" name="asset_class" className="flex-1">
          <SelectAssetClass placeholder="Select asset class" />
        </Form.Item>
        <Form.Item label="Trade Action" name="trade_action" className="flex-1">
          <TradeAction />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Description" name="description" className="flex-1">
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item label="Currency" name="currency" className="flex-1">
          <SelectCurrency placeholder="Select currency" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item label="Cost Price" name="cost_price" className="flex-1">
          <InputPrice placeholder="Enter cost price" />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" className="flex-1">
          <InputQuantity placeholder="Enter the quantity" />
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
