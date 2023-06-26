import { Form, Input, Row, Select } from "antd";
import FormActions from "../Common/FormAction";

export default function GoalsForm() {
  return (
    <Form layout="vertical" size="large" className="space-y-6 pb-20">
      <Row>
        <Form.Item
          label="Asset Class Preference"
          name="asset_class_preference"
          className="flex-1"
        >
          <Select placeholder="Select asset class preference" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Investment Horizon"
          name="investment_horizon"
          className="flex-1"
        >
          <Input placeholder="Enter investment horizon" />
        </Form.Item>
        <Form.Item
          label="Liquidity Needs"
          name="liquidity_needs"
          className="flex-1"
        >
          <Select placeholder="Select liquidity needs" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Return Expectations"
          name="return_expectations"
          className="flex-1"
        >
          <Select placeholder="Select return expectations" />
        </Form.Item>
        <Form.Item
          label="Holding Period"
          name="holding_period"
          className="flex-1"
        >
          <Input placeholder="Enter holding period" />
        </Form.Item>
      </Row>
      <FormActions />
    </Form>
  );
}
