"use client";

import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { ManipulateType, QUnitType } from "dayjs";
import useSearchParams from "@/hooks/useSearchParams";
import FinanceChart from "./Common/FinanceChart";

interface IDuration {
  label: string;
  value: ManipulateType | QUnitType;
}

const GRAPHS = ["Net Worth", "P/L History"];

const DURATION: IDuration[] = [
  { label: "1 Week", value: "w" },
  { label: "1 Month", value: "M" },
  { label: "1 Quarter", value: "Q" },
  { label: "1 Year", value: "y" },
];

// const DURATION_AMOUNT = 1;

function useFinanceResult() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const assetDuration = getSearchParams("asset_duration") as ManipulateType;
  function onDurationChange(value: SegmentedValue) {
    updateSearchParams({
      asset_duration: value,
    });
  }

  return {
    assetDuration,
    onDurationChange,
  };
}

export default function FinanceResult() {
  const { assetDuration, onDurationChange } = useFinanceResult();

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-1 p-6">
      <div className="space-x-2 self-end">
        <Segmented
          onChange={onDurationChange}
          options={DURATION}
          defaultValue={assetDuration}
        />
      </div>
      <div className="flex flex-col lap:flex-row">
        {GRAPHS.map((graph: string) => (
          <FinanceChart key={graph} title={graph} />
        ))}
      </div>
    </div>
  );
}
