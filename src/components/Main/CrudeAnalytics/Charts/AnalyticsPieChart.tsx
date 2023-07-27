import defaultPieChartConfig from "@/constants/pieChartConfig";
import { IPieData } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
import { Pie, PieConfig } from "@ant-design/plots";

interface IPieProps {
  data: IPieData[];
  totalValue: number;
  handleSegmentClick: () => void;
}

export default function AnalyticsPieChart({
  data,
  totalValue,
  handleSegmentClick,
}: IPieProps) {
  const pieChartConfig: PieConfig = {
    ...defaultPieChartConfig,
    data,
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
    <Pie
      style={{ maxWidth: "300px", maxHeight: "300px" }}
      {...pieChartConfig}
    />
  );
}
