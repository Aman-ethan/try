"use client";

import { Form, Input } from "antd";

export default function PhoneInput() {
  return (
    <Form.Item label="Phone Number" name="phone_number">
      <Input type="tel" placeholder="123456789" />
    </Form.Item>
  );
}
