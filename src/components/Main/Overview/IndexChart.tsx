import aapl from "@/constants/data/aapl";
import mcd from "@/constants/data/mcd";
import msft from "@/constants/data/msft";
import * as Plot from "@observablehq/plot";
import { Spin } from "antd";
import clsx from "clsx";
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
import { useEffect, useMemo, useRef, useState } from "react";

interface Data {
  x: string;
  y: number;
  z: string;
}

// interface IIndexChartProps {
//   data: Data[];
//   loading?: boolean;
// }

interface IFillMissingDataParams {
  data: Record<string, Data[]>;
  xticks: string[];
}

type TScaleRecord = string[] | undefined;

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

// const OFFSET = 1;

const data = [
  ...aapl.map((item) => ({ x: item.date, y: item.adjusted_close, z: "Cash" })),
  ...mcd.map((item) => ({
    x: item.date,
    y: item.adjusted_close,
    z: "Deposit",
  })),
  ...msft.map((item) => ({
    x: item.date,
    y: item.adjusted_close,
    z: "Equity",
  })),
  ...aapl.map((item) => ({
    x: item.date,
    y: item.adjusted_close,
    z: "Fixed Income",
  })),
  ...aapl.map((item) => ({ x: item.date, y: item.adjusted_close, z: "Funds" })),
  ...aapl.map((item) => ({ x: item.date, y: item.adjusted_close, z: "Bonds" })),
];
const loading = false;

export default function IndexChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [normalizeIndex, setNormalizeIndex] = useState(0);
  const [excludedDomain, setExcludedDomain] = useState<string[]>([]);
  const chartScaleRef = useRef<Plot.Scale>();

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

    excludedDomain.forEach((domain) => {
      delete _groupedData[domain];
    });

    const filledGroupedData = fillMissingData({
      data: _groupedData,
      xticks,
    });
    const _filledData = Object.values(filledGroupedData).flat();

    return [_filledData, filledGroupedData];
  }, [excludedDomain]);

  useEffect(() => {
    if (filledData.length === 0) return undefined;
    const maxDomain = max(
      map(
        groupedData,
        (item) => (maxBy(item, "y") as Data).y / (minBy(item, "y") as Data).y
      )
    ) as number;

    const options = Plot.normalizeY(
      (Y: number[]) => {
        return Y[normalizeIndex];
      },
      {
        x: "x",
        y: "y",
        stroke: "z",
        strokeWidth: 2,
      }
    );
    const chart = Plot.plot({
      style: {
        overflow: "visible",
      },
      x: {
        type: "utc",
        label: null,
      },
      y: {
        type: "log",
        tickFormat: (
          (f) => (y) =>
            f(y - 1)
        )(format("+.0%")),
        label: null,
        domain: [1 / maxDomain, maxDomain],
        grid: true,
      },
      color: {
        domain: chartScaleRef.current?.domain,
        range: chartScaleRef.current?.range,
      },
      marks: [
        Plot.ruleY([1]),
        Plot.lineY(filledData, options),
        Plot.crosshairX(filledData, { ...options, y: null }),
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
    if (!chartScaleRef.current) {
      chartScaleRef.current = chart.scale("color");
    }
    chartRef.current?.append(chart);

    return () => chart.remove();
  }, [normalizeIndex, filledData, groupedData]);
  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );
  return (
    <div className="h-full flex flex-col">
      <div ref={chartRef} />
      <div className="w-full flex items-center py-6 max-w-lg overflow-x-auto">
        <div className="flex gap-x-4">
          {(chartScaleRef.current?.domain as TScaleRecord)?.map(
            (domain, index) => {
              const isExcluded = excludedDomain?.includes(domain);
              return (
                <button
                  type="button"
                  key={domain}
                  className={clsx(
                    "flex items-center px-2 py-0.5 border border-neutral-3 bg-neutral-2 rounded-md",
                    isExcluded ? "opacity-50" : ""
                  )}
                  onClick={() => {
                    if (isExcluded) {
                      setExcludedDomain((prev) =>
                        prev.filter((item) => item !== domain)
                      );
                    } else {
                      setExcludedDomain((prev) => [...prev, domain]);
                    }
                  }}
                >
                  <div
                    className="w-4 h-4 mr-2"
                    style={{
                      backgroundColor: (
                        chartScaleRef.current?.range as TScaleRecord
                      )?.[index],
                    }}
                  />
                  <div className="whitespace-nowrap">{domain}</div>
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
