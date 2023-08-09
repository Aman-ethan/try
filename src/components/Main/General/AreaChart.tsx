import { Area, AreaConfig } from "@ant-design/charts";
import { formatPrice } from "@/lib/format";

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
    tooltip: {
      formatter: (datum) => ({
        name: `${datum.asset_class}`,
        value: formatPrice(datum.value),
      }),
    },
  };

  return <Area {...config} />;
}

export default AreaChart;
