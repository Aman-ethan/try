import { Pie, PieConfig } from "@ant-design/plots";
import defaultPieChartConfig, {
  mapDataToPieChartData,
  IPieData,
} from "@/constants/pieChartConfig";
import { formatCompactNumber } from "@/lib/format";

interface IPieProps {
  data: IPieData[];
  totalValue: number;
  handleSegmentClick: () => void;
  colorMap: { [key: string]: string };
}

export default function AnalyticsPieChart({
  data,
  totalValue,
  handleSegmentClick,
  colorMap,
}: IPieProps) {
  const pieChartData: IPieData[] = mapDataToPieChartData(data);

  const pieChartConfig: PieConfig = {
    ...defaultPieChartConfig,
    data: pieChartData,
    color: (datum) => colorMap[datum.type], // add this line
    statistic: {
      ...defaultPieChartConfig.statistic,
      content: {
        ...defaultPieChartConfig.statistic?.content,
        content: formatCompactNumber(totalValue),
      },
    },
    onReady: (plot) => {
      plot.on("element:click", (..._args: any[]) => {
        handleSegmentClick();
      });
    },
    animation: false,
  };

  return (
    <Pie {...pieChartConfig} style={{ width: "100%", maxHeight: "300px" }} />
  );
}
