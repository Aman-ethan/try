import { Pie, PieConfig } from "@ant-design/plots";
import defaultPieChartConfig, {
  renderTextInsideContainer,
  IPercentageData,
} from "@/constants/pieChartConfig";
import { formatCompactNumber } from "@/lib/format";

interface IPieProps {
  data: IPercentageData[];
  totalValue: number;
  handleSegmentClick: (_type: string) => void;
  colorMap: { [key: string]: string };
}

export default function AnalyticsPieChart({
  data,
  totalValue,
  handleSegmentClick,
  colorMap,
}: IPieProps) {
  const pieChartConfig: PieConfig = {
    ...defaultPieChartConfig,
    data,
    color: (datum) => colorMap[datum.type], // add this line
    statistic: {
      ...defaultPieChartConfig.statistic,
      content: {
        ...defaultPieChartConfig.statistic?.content,
        customHtml: (container, _view, datum, _pieDataPoints) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? formatCompactNumber(datum.value)
            : formatCompactNumber(totalValue);
          return renderTextInsideContainer(width, text, { fontSize: 14 });
        },
      },
    },
    onReady: (plot) => {
      plot.on("element:click", (...args: any[]) => {
        const type = args[0]?.data?.data?.type;
        handleSegmentClick(type);
      });
    },
    animation: false,
  };

  return (
    <Pie {...pieChartConfig} style={{ width: "300px", maxHeight: "300px" }} />
  );
}
