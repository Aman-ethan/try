import { Pie, PieConfig } from "@ant-design/plots";
import defaultPieChartConfig from "@/constants/pieChartConfig";

interface PieData {
  type: string;
  value: number;
}

interface IPieProps {
  data: PieData[];
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
        content: `${totalValue}M`,
      },
    },
    onReady: (plot) => {
      plot.on("element:click", (..._args: any[]) => {
        handleSegmentClick();
      });
    },
  };

  return (
    <Pie
      {...pieChartConfig}
      style={{ maxWidth: "300px", maxHeight: "300px" }}
    />
  );
}
