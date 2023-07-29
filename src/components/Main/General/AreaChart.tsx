import { Area, AreaConfig } from "@ant-design/charts";

type TDataItem = {
  date: string;
  asset_class: string;
  value: number;
};

interface IAreaChartProps {
  data?: TDataItem[];
  xField?: string;
  yField?: string;
  seriesField?: string;
}

function AreaChart({ data, xField, yField, seriesField }: IAreaChartProps) {
  const config: AreaConfig = {
    data: data || [],
    xField: xField || "date",
    yField: yField || "value",
    seriesField: seriesField || "asset_class",
  };

  return <Area {...config} />;
}

export default AreaChart;
