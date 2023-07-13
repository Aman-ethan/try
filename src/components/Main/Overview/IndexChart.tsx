import { useEffect, useMemo, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import { format } from "d3";
import {
  groupBy,
  isEqual,
  map,
  max,
  maxBy,
  minBy,
  reduce,
  sortBy,
  uniqBy,
} from "lodash";
import { Spin } from "antd";

interface Data {
  x: string;
  y: number;
  z: string;
}

interface IIndexChartProps {
  data: Data[];
  loading?: boolean;
}

interface IFillMissingDataParams {
  data: Record<string, Data[]>;
  xticks: string[];
}

function fillMissingData({ data, xticks }: IFillMissingDataParams) {
  return reduce(
    data,
    (result, value, key) => {
      if (value.length < xticks.length) {
        return {
          ...result,
          [key]: xticks.map((tick) => {
            const found = value.find((item) => item.x === tick);
            if (found) {
              return found;
            }
            return {
              x: tick,
              y: value[value.length - 1].y,
              z: key,
            };
          }),
        };
      }
      return result;
    },
    data
  );
}

const OFFSET = 1;

export default function IndexChart({ data, loading }: IIndexChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [normalizeIndex, setNormalizeIndex] = useState<any>(0);

  const [filledData, groupedData] = useMemo(() => {
    setNormalizeIndex(0);

    const absoluteData = data?.map((item) => {
      return {
        ...item,
        y: Math.abs(item.y),
      };
    });

    const xticks = sortBy(
      uniqBy(data, "x").map((item) => item.x),
      [
        function sortByDate(o) {
          return new Date(o);
        },
      ]
    );

    const _groupedData = groupBy(absoluteData, "z");
    const filledGroupedData = fillMissingData({
      data: _groupedData,
      xticks,
    });
    const _filledData = Object.values(filledGroupedData).flat();

    return [_filledData, filledGroupedData];
  }, [data]);

  useEffect(() => {
    if (filledData.length === 0) return undefined;
    const maxDomain =
      (max(
        map(
          groupedData,
          (item) => (maxBy(item, "y") as Data).y / (minBy(item, "y") as Data).y
        )
      ) as number) + OFFSET;

    const options = Plot.normalizeY(
      (Y: number[]) => {
        return Y[normalizeIndex];
      },
      {
        x: "x",
        y: "y",
        stroke: "z",
      }
    );
    const chart = Plot.plot({
      style: {
        overflow: "visible",
      },
      color: {
        legend: true,
      },
      x: {
        type: "utc",
      },
      y: {
        type: "log",
        tickFormat: (
          (f) => (y) =>
            f(y - 1)
        )(format(".6~s")),
        label: "",
        domain: [1 / maxDomain, maxDomain],
      },
      marks: [
        Plot.ruleY([1]),
        Plot.lineY(filledData, options),
        Plot.crosshairX(filledData, { ...options, y: undefined }),
      ],
    });

    chart.oninput = () => {
      const selectedValue = chart.value;
      if (selectedValue) {
        setNormalizeIndex(() =>
          groupedData[selectedValue.z]?.findIndex((item) =>
            isEqual(item, selectedValue)
          )
        );
      }
    };
    chartRef.current?.append(chart);
    return () => chart.remove();
  }, [normalizeIndex, filledData, groupedData]);
  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );
  return <div ref={chartRef} />;
}
