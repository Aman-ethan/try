"use client";

import SelectAsset from "../../Input/SelectAsset";

interface IAssetSelectProps {
  handleOptionChange: (_value: string) => void;
}

export default function AssetSelect({ handleOptionChange }: IAssetSelectProps) {
  return (
    <div className="flex items-center space-x-4">
      <p className="text-lg font-medium">Asset</p>
      <SelectAsset
        labelInValue
        placeholder="Select Ticker"
        filterOption={false}
        onSelect={(value) => handleOptionChange(value.value)}
        className="w-[300px]"
        showSearch
        allowClear
      />
    </div>
  );
}
