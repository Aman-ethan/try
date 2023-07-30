"use client";

import { useLayoutEffect, useState } from "react";
import { SegmentedValue } from "antd/es/segmented";
import { IAssetNetWorth } from "@/interfaces/Main";
import useRelativeChart from "@/hooks/useRelativeChart";
import Segmented from "../../General/Segmented";
import PerformanceChart from "./PerformanceRelative";

const options = [
  { label: "By Asset Class", value: "asset" },
  { label: "By Ticker", value: "ticker" },
];

const tickerUrlKey = "/relative-performance/stocks/";
const networthUrlKey = "/relative-performance/networth/";

export default function RelativeChart() {
  const [value, setValue] = useState<SegmentedValue>("ticker");
  const [ticker, setTicker] = useState<string[]>([]);
  const onValueChange = (e: SegmentedValue) => {
    setValue(e);
  };
  const urlKey = value === "ticker" ? tickerUrlKey : networthUrlKey;
  const { data } = useRelativeChart<IAssetNetWorth>({
    urlKey,
    ticker,
  });

  useLayoutEffect(() => {
    if (value === "ticker") {
      setTicker([]);
    } else {
      setTicker([]);
    }
  }, [value]);

  return (
    <div className="space-y-6 rounded-lg bg-neutral-1 p-6">
      <div className="flex items-center justify-between">
        <div className="space-x-4">
          <Segmented
            options={options}
            value={value}
            onChange={onValueChange}
            defaultValue={options[0].value}
            size="large"
            className="w-[300px]"
          />
        </div>
      </div>
      <PerformanceChart
        data={
          value === "ticker"
            ? data?.data
            : data?.data?.filter((item) => ticker.includes(item.z))
        }
        setTicker={setTicker}
        value={value}
        ticker={ticker}
      />
    </div>
  );
}
