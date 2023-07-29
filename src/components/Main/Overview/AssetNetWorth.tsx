"use client";

import useClientDropdown from "@/hooks/useClientDropdown";
import { IAssetNetWorth } from "@/interfaces/Main";
import Dropdown from "../General/Dropdown";
import IndexChart from "./IndexChart";

const urlKey = "/relative-performance/networth/";
const searchParamKey = "asset_client";

export default function AssetNetWorth() {
  const { loading, onChange, options, selectedClient, data } =
    useClientDropdown<IAssetNetWorth>({ urlKey, searchParamKey });

  return (
    <div className="flex-1 rounded-lg bg-white p-6 pb-0 space-y-6">
      <Dropdown
        disabled={loading || !selectedClient?.value}
        menu={{
          onClick: ({ key }) => onChange(key),
          items: options,
          defaultSelectedKeys: [selectedClient?.key as string],
        }}
      >
        {selectedClient?.label || "Client"}
      </Dropdown>
      <IndexChart data={data?.data} loading={loading} />
    </div>
  );
}
