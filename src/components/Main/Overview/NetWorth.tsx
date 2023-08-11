"use client";

import { useResizeObserver } from "@mantine/hooks";
import AssetNetWorth from "./AssetNetWorth";
import ClientNetWorth from "./ClientNetWorth";

export default function NetWorth() {
  const [containerRef, containerRect] = useResizeObserver();
  const chartHeight = containerRect.width * 0.5;
  const assetNetWorthHeight = chartHeight + 114;
  const tableHeight = assetNetWorthHeight - 80;
  return (
    <div className="flex flex-col gap-y-4 lap:flex-row lap:gap-x-8">
      <div className="shadow-large flex-1 rounded-lg bg-white p-6 lap:max-desk:w-min lap:max-desk:flex-none">
        <ClientNetWorth tableHeight={tableHeight} />
      </div>
      <div
        ref={containerRef}
        className="shadow-large flex-1 overflow-hidden rounded-lg bg-white p-6 pb-0"
      >
        <AssetNetWorth height={assetNetWorthHeight} />
      </div>
    </div>
  );
}
