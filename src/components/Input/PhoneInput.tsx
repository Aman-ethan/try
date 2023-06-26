"use client";

import CallingCodes from "@/constants/callingCodes";
import { Form, Input, Select, Space } from "antd";

const UniqueCallingCodes = [...new Set(Object.values(CallingCodes))]
  .sort()
  .map((code) => `+${code}`);
const DEFAULT_COUNTRY_CODE = "+65";

export default function PhoneInput() {
  return (
    <Space.Compact className="w-full">
      <Form.Item
        label="Phone Number"
        name="country_code"
        initialValue={DEFAULT_COUNTRY_CODE}
        className="w-1/4"
      >
        <Select showSearch>
          {UniqueCallingCodes.map((code) => (
            <Select.Option key={code} value={code}>
              {code}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="&nbsp;" name="phone_number" className="flex-1">
        <Input type="tel" placeholder="1234-56789" />
      </Form.Item>
    </Space.Compact>
  );
}
