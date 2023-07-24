import { Area, AreaConfig } from "@ant-design/charts";

type TDataItem = {
  report_date: string;
  asset_class: string;
  value: number;
};

interface IAreaChartProps {
  data: TDataItem[];
}

function AreaChart({ data }: IAreaChartProps) {
  const config: AreaConfig = {
    data,
    xField: "report_date",
    yField: "value",
    seriesField: "asset_class",
  };

  return <Area {...config} />;
}

export default AreaChart;
