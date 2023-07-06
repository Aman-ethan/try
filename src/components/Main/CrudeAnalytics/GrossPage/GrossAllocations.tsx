"use client";

import Allocation from "./Common/Allocation";

const CHARTS = ["Asset Class", "Industry", "Region"];

export default function GrossAllocations() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-neutral-1 p-6">
      {CHARTS.map((chart: string) => (
        <Allocation key={chart} title={chart} />
      ))}
    </div>
  );
}
