import { DatePicker, Form, Input, Row, Select } from "antd";
import FormActions from "../Common/FormAction";

export default function EstatesForm() {
  return (
    <Form layout="vertical" size="large" className="space-y-6 pb-20">
      <Row className="gap-x-8">
        <Form.Item
          label="Type"
          name="type"
          className="flex-1"
        >
          <Select placeholder="Select type" />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          className="flex-1"
        >
          <Input placeholder="Enter name" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Email"
          name="email"
          rules={[{type:"email"}]}
          className="flex-1"
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{type:"number"}]}
          className="flex-1"
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </Row>
      <Row className="gap-x-8">
        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          className="flex-1"
        >
          <DatePicker className="flex-1"/>
        </Form.Item>
        <Form.Item
          label="Relationship"
          name="relationship"
          className="flex-1"
        >
          <Input placeholder="Enter Relationship" />
        </Form.Item>
      </Row>
      <Row>
      <Form.Item
          label="% Share"
          name="share"
          rules={[{type:"number"}]}
        >
          <Input placeholder="Enter the share" />
        </Form.Item>
      </Row>
      <FormActions />
    </Form>
  );
}
