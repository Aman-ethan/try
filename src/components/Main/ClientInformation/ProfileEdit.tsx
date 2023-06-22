"use client";

import Title from "@/components/Typography/Title";
import {
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";

export default function ProfileEdit() {
  return (
    <>
      <Title>Edit Profile</Title>
      <ProForm>
        <ProForm.Group style={{ margin: "2em" }}>
          <ProFormText width="lg" name="first_name" label="First Name" />
          <ProFormText width="lg" name="last_name" label="Last Name" />
        </ProForm.Group>
        <ProForm.Group style={{ margin: "2em" }}>
          <ProFormDatePicker
            width="lg"
            name="date_of_birth"
            label="Date Of Birth"
            placeholder="Choose Date Of Birth"
          />
          <ProFormText width="lg" name="nationality" label="Nationality" />
        </ProForm.Group>
        <ProForm.Group style={{ margin: "2em" }}>
          <ProFormText
            width="lg"
            name="identification_number"
            label="Identification Number"
          />
          <ProFormText width="lg" name="occupation" label="Occupation" />
          <ProFormText width="lg" name="rpt_currency" label="RPT Currency" />
        </ProForm.Group>
        <ProForm.Group style={{ margin: "2em" }}>
          <ProFormText width="lg" name="tax_residency" label="Tax Residency" />
          {/* <ProFormText width="md" name="risk_profile" label="Risk Profile" /> */}
          <ProFormSelect
            width="lg"
            name="risk_profile"
            label="Risk Profile"
            placeholder="Choose risk profile"
            options={[
              {
                value: "conservative",
                label: "Conservative",
              },
              {
                value: "moderate",
                label: "Moderate",
              },
              {
                value: "aggressive",
                label: "Aggressive",
              },
            ]}
          />
          <ProFormText
            width="lg"
            name="email"
            label="Email"
            rules={[{ type: "email" }]}
          />
        </ProForm.Group>
        <ProForm.Group style={{ margin: "2em" }}>
          <ProFormText
            width="lg"
            name="phone_number"
            label="Phone Number"
            rules={[{ type: "number" }]}
          />
          <ProFormTextArea width="lg" name="address" label="Address" />
          <ProFormText width="lg" name="city" label="City" />
        </ProForm.Group>
        <ProForm.Group style={{ margin: "2em" }}>
          <ProFormText width="lg" name="postal_code" label="Postal Code" />
          <ProFormText width="lg" name="country" label="Country" />
        </ProForm.Group>
      </ProForm>
    </>
  );
}
