import { useEffect, useRef } from "react";
import {
  plot,
  ruleY,
  lineY,
  normalizeY,
  text,
  selectLast,
  line,
} from "@observablehq/plot";
import { format } from "d3";

interface IIndexChartProps {
  data: any;
}

export default function IndexChart({ data }: IIndexChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data) {
      // const chart = line(
      //   data.map((d:any) => ({ ...d, report_date: new Date(d.report_date) })),
      //   normalizeY({ x: "report_date", y: "net_worth", stroke: "asset_class" })
      // ).plot({
      //   y: { type: "log", grid: true },
      // });
      const chart = plot({
        y: {
          type: "log",
          grid: true,
          label: "↑ Change in price (%)",
          tickFormat: (
            (f) => (x) =>
              f((x - 1) * 100)
          )(format("+d")),
        },
        marks: [
          ruleY([1]),
          lineY(
            data,
            normalizeY({
              x: "report_date",
              y: "net_worth",
              stroke: "asset_class",
            })
          ),
          text(
            data,
            selectLast(
              normalizeY({
                x: "report_date",
                y: "net_worth",
                z: "asset_class",
                text: "asset_class",
                textAnchor: "start",
                dx: 3,
              })
            )
          ),
        ],
      });
      chartRef.current?.append(chart);
      return () => chart.remove();
    }
  }, [data]);

  return <div ref={chartRef} />;
}
