"use client";

import { useEffect, useState } from "react";
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
  const { data, loading } = useRelativeChart<IAssetNetWorth>({
    urlKey,
    ticker,
  });

  useEffect(() => {
    setTicker([]);
  }, [value]);

  return (
    <div className="space-y-6 rounded-lg bg-neutral-1 p-4 tab:p-6 tab:space-y-8">
      <div className="w-72">
        <Segmented
          options={options}
          value={value}
          onChange={onValueChange}
          defaultValue={options[0].value}
        />
      </div>
      <PerformanceChart
        data={data?.data}
        setTicker={setTicker}
        value={value}
        ticker={ticker}
        loading={loading}
      />
    </div>
  );
}
