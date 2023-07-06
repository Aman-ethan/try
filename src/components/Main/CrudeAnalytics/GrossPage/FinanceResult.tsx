"use client";

import { Button } from "antd";
import { ManipulateType, QUnitType } from "dayjs";
import FinanceChart from "./Common/FinanceChart";

interface IDuration {
  label: string;
  value: ManipulateType | QUnitType;
}

const GRAPHS = ["Net Worth", "PL Sum"];

const DURATION: IDuration[] = [
  { label: "1 Week", value: "w" },
  { label: "1 Month", value: "M" },
  { label: "1 Quarter", value: "Q" },
  { label: "1 Year", value: "y" },
];

export default function FinanceResult() {
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-1 p-6">
      <div className="space-x-4 self-end">
        {DURATION.map(({ label, value }) => (
          <Button size="large" key={value}>
            {label}
          </Button>
        ))}
      </div>
      <div className="flex">
        {GRAPHS.map((graph: string) => (
          <FinanceChart key={graph} title={graph} />
        ))}
      </div>
    </div>
  );
}
