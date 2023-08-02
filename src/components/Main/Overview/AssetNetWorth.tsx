"use client";

import { Empty } from "antd";
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
    <div className="space-y-6 flex flex-col h-full">
      <Dropdown
        className="self-start"
        disabled={loading || !selectedClient?.value}
        menu={{
          onClick: ({ key }) => onChange(key),
          items: options,
          defaultSelectedKeys: [selectedClient?.key as string],
        }}
      >
        {selectedClient?.label || "Client"}
      </Dropdown>
      {!(loading || data?.data) ? (
        <div className="flex-1 flex flex-col">
          <Empty className="my-auto -translate-y-6" />
        </div>
      ) : (
        <IndexChart
          key={selectedClient?.key}
          data={data?.data}
          loading={loading}
        />
      )}
    </div>
  );
}
