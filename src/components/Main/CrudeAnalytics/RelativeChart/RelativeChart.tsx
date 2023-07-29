"use client";

import { Radio, Skeleton } from "antd";
import useSearchParams from "@/hooks/useSearchParams";
import { useCallback, useEffect, useState } from "react";
import { useAnalyticsServerMutation } from "@/hooks/useMutation";
import AssetSelect from "./AssetSelect";
import TickerSelect from "./TickerSelect";
import IndexChart from "../../Overview/IndexChart";

const options = [
  { label: "By Asset Class", value: "asset" },
  { label: "By Ticker", value: "ticker" },
];

const URLS = {
  post: `/relative-performance/networth`,
};
type ChartData = {
  title: string;
  x_label: string;
  y_label: string;
  data: {
    x: string;
    y: number;
    z: string;
  }[];
};

const useRelativePerformance = () => {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client");
  const { trigger, isMutating, data } = useAnalyticsServerMutation(URLS.post);
  return {
    data: data as ChartData,
    isLoading: isMutating,
    client_id,
    trigger,
  };
};

export default function RelativeChart() {
  const [value, setValue] = useState("asset");
  const onRadioChange = (e: any) => {
    setValue(e.target.value);
  };

  const { data, isLoading, client_id, trigger } = useRelativePerformance();

  const onChange = useCallback(() => {
    trigger({
      client_id,
      start_date: "2023-07-27",
      end_date: "2023-07-27",
    });
  }, [client_id, trigger]);

  useEffect(() => {
    onChange();
  }, [onChange]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-6 rounded-lg bg-neutral-1 p-6">
      <div className="flex items-center justify-between">
        <div className="space-x-4">
          <Radio.Group
            size="large"
            options={options}
            onChange={onRadioChange}
            value={value}
            optionType="button"
            buttonStyle="solid"
            defaultValue={options[0].value}
          />
        </div>
      </div>
      {value === "ticker" ? <TickerSelect /> : <AssetSelect />}
      <IndexChart data={data?.data} />
    </div>
  );
}
