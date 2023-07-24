"use client";

import Allocation from "../CrudeAnalytics/GrossPage/Common/Allocation";

const CHARTS = ["Asset Class", "Industry", "Region"];

export default function Analytics() {
  return (
    <div className="flex flex-col rounded-lg bg-neutral-1 p-6 lap:flex-row lap:items-center lap:justify-center">
      {CHARTS.map((chart: string) => (
        <Allocation key={chart} title={chart} />
      ))}
    </div>
  );
}
