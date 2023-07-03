"use client";

import { Button } from "antd";
import { ManipulateType, QUnitType } from "dayjs";
import TickerSelect from "./TickerSelect";

interface IDuration {
  label: string;
  value: ManipulateType | QUnitType;
}

const DURATION: IDuration[] = [
  { label: "1 Week", value: "w" },
  { label: "1 Month", value: "M" },
  { label: "1 Quarter", value: "Q" },
  { label: "1 Year", value: "y" },
];

export default function RelativeChart() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-x-4">
          <Button type="primary" size="large">
            By Asset Class
          </Button>
          <Button size="large">By Ticker</Button>
        </div>
        <div className="space-x-4">
          {DURATION.map(({ label, value }) => (
            <Button size="large" key={value}>
              {label}
            </Button>
          ))}
        </div>
      </div>
      <TickerSelect />
      {/* Index chart goes here */}
    </div>
  );
}
