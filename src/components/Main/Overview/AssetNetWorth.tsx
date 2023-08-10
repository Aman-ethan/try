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
    <div className="flex h-full flex-col gap-y-4 tab:gap-y-6">
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
        <div className="flex flex-1 flex-col">
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
