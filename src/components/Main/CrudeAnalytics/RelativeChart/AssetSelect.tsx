"use client";

import ClientAssetSelect from "../../Input/ClientAssetSelect";

interface IAssetSelect {
  handleOptionChange: (_value: string) => void;
}

export default function AssetSelect({ handleOptionChange }: IAssetSelect) {
  return (
    <div className="flex items-center gap-4">
      <p className="w-11 text-base font-medium tab:text-lg">Asset</p>
      <ClientAssetSelect
        labelInValue
        placeholder="Search Asset"
        onSelect={(value) => handleOptionChange(value.value)}
        className="w-60"
        showSearch
        allowClear
      />
    </div>
  );
}
