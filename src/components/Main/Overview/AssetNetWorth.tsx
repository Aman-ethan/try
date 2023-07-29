"use client";

import useClientDropdown from "@/hooks/useClientDropdown";
import { IAssetNetWorth } from "@/interfaces/Main";
import { Empty } from "antd";
import Dropdown from "../General/Dropdown";
import IndexChart from "./IndexChart";

const urlKey = "/relative-performance/networth/";
const searchParamKey = "asset_client";

export default function AssetNetWorth() {
  const { loading, onChange, options, selectedClient, data } =
    useClientDropdown<IAssetNetWorth>({ urlKey, searchParamKey });
  if (!(loading && data))
    return (
      <div className="h-full w-full flex flex-col">
        <Empty className="my-auto" />
      </div>
    );
  return (
    <div className="space-y-6">
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
      <IndexChart data={data.data} loading={loading} />
    </div>
  );
}
