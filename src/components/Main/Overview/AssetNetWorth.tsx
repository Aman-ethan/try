"use client";

import useClientDropdown from "@/hooks/useClientDropdown";
import { IAssetNetWorth } from "@/interfaces/Main";
import Dropdown from "../General/Dropdown";
import IndexChart from "./IndexChart";

const urlKey = "/relative-performance/net-worth";
const searchParamKey = "asset_client";

export default function AssetNetWorth() {
  const { loading, onChange, options, selectedClient, data } =
    useClientDropdown<IAssetNetWorth>({ urlKey, searchParamKey });

  return (
    <div className="h-[25.5rem] space-y-6">
      <Dropdown
        disabled={loading}
        menu={{
          onClick: ({ key }) => onChange(key),
          items: options,
          defaultSelectedKeys: [selectedClient?.key as string],
        }}
      >
        {selectedClient?.label}
      </Dropdown>
      <IndexChart data={data?.data} loading={loading} />
    </div>
  );
}
