"use client";

import AreaChart from "@/components/Main/General/AreaChart";
import Title from "@/components/Typography/Title";
import { Empty } from "antd";

type TDataItem = {
  date: string;
  asset_class: string;
  value: number;
};

interface IFinanceChartProps {
  title: string;
  xField?: string;
  yField?: string;
  seriesField?: string;
  data?: TDataItem[];
}
export default function FinanceChart({
  title,
  xField,
  yField,
  seriesField,
  data,
}: IFinanceChartProps) {
  return (
    <div className="flex-1">
      <Title>{title}</Title>
      {data?.length !== 0 ? (
        <AreaChart
          data={data}
          xField={xField}
          yField={yField}
          seriesField={seriesField}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
}
