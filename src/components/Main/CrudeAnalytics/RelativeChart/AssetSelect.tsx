"use client";

import ClientAssetSelect from "../../Input/ClientAssetSelect";

interface IAssetSelect {
  handleOptionChange: (_value: string) => void;
}

export default function AssetSelect({ handleOptionChange }: IAssetSelect) {
  return (
    <div className="flex items-center space-x-4">
      <p className="text-lg font-medium">Asset</p>
      <ClientAssetSelect
        labelInValue
        placeholder="Select Asset"
        onSelect={(value) => handleOptionChange(value.value)}
        className="w-[300px]"
        showSearch
        allowClear
      />
    </div>
  );
}
