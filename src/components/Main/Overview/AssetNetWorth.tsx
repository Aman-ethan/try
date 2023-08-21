"use client";

import { IAssetNetWorth } from "@/interfaces/Main";
import ClientDropdownCard from "./ClientDropdownCard";
import IndexChart from "./IndexChart";

const urlKey = "/relative-performance/networth/";
const searchParamKey = "asset_client";

export default function AssetNetWorth({ height }: { height: number }) {
  return (
    <div
      className="space-y-4 tab:space-y-6"
      style={{
        height,
      }}
    >
      <ClientDropdownCard<IAssetNetWorth>
        searchParamKey={searchParamKey}
        urlKey={urlKey}
      >
        {(data, loading, selectedClientId) => (
          <IndexChart
            key={selectedClientId}
            data={data?.data}
            loading={loading}
          />
        )}
      </ClientDropdownCard>
    </div>
  );
}
