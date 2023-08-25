"use client";

import Select from "@/components/Input/Select";
import { Form, Tag } from "antd";

const AssetClassPreference = [
  { label: "Equity", value: "equity" },
  { label: "Fixed Income", value: "fixed_income" },
  { label: "Cash", value: "cash" },
  { label: "Alternative", value: "alternative" },
];

const AssetClassMap = {
  equity: "Equity",
  fixed_income: "Fixed Income",
  cash: "Cash",
  alternative: "Alternative",
};

export const AssetColorMap = {
  equity: "cyan",
  fixed_income: "geekblue",
  cash: "orange",
  alternative: "red",
};

type TAssetColorType = keyof typeof AssetColorMap;

interface ISelectAssetPreferenceProps {
  name: string;
  placeholder?: string;
}

function SelectAssetPreference({
  name,
  placeholder,
}: ISelectAssetPreferenceProps) {
  const form = Form.useFormInstance();
  const assetPreference = Form.useWatch(name, form);

  const handleChange = (value: TAssetColorType) => {
    if (!value || assetPreference?.includes(value)) return;
    form.setFieldValue(name, [...(assetPreference || []), value]);
  };

  return (
    <div className="space-y-2">
      <Select
        options={AssetClassPreference}
        placeholder={placeholder}
        onChange={handleChange}
        showSearch
        allowClear
      />
      {assetPreference?.map((value: TAssetColorType) => (
        <Tag
          key={value}
          color={AssetColorMap[value]}
          closable
          onClose={() =>
            form.setFieldValue(
              name,
              assetPreference?.filter((item: TAssetColorType) => item !== value)
            )
          }
        >
          {AssetClassMap[value]}
        </Tag>
      ))}
    </div>
  );
}

export default SelectAssetPreference;
