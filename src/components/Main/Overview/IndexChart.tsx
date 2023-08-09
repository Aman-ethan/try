import { useEffect, useMemo, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import { Empty, Spin, Tag, message } from "antd";
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
import { IAssetNetWorth } from "@/interfaces/Main";
import { OrdinalRange } from "@/constants/strings";

type TData = IAssetNetWorth["data"][0];

interface IIndexChartProps {
  data?: TData[];
  loading?: boolean;
}

interface IFillMissingDataParams {
  data: Record<string, TData[]>;
  xticks: string[];
}

const AXIS_OFFSET = 0.05;

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

export default function IndexChart({ data, loading }: IIndexChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [normalizeIndex, setNormalizeIndex] = useState(0);
  const [excludedDomain, setExcludedDomain] = useState<string[]>([]);

  const [filledData, filledGroupedData, domains] = useMemo(() => {
    setNormalizeIndex(0);

    const absoluteData = sortBy(
      data?.map((item) => {
        return {
          ...item,
          y: Math.abs(item.y),
        };
      }),
      [
        function sortByDate(o) {
          return new Date(o.x);
        },
      ]
    );

    const xticks = sortBy(
      uniqBy(data, "x").map((item) => item.x),
      [
        function sortByDate(o) {
          return new Date(o);
        },
      ]
    );

    const _groupedData = groupBy(absoluteData, "z");
    const _domains = Object.keys(_groupedData).sort();

    excludedDomain.forEach((domain) => {
      delete _groupedData[domain];
    });

    const _filledGroupedData = fillMissingData({
      data: _groupedData,
      xticks,
    });

    const _filledData = Object.values(_filledGroupedData).flat();

    return [_filledData, _filledGroupedData, _domains];
  }, [excludedDomain, data]);

  useEffect(() => {
    if (filledData.length === 0) return undefined;
    const maxDomain = max(
      map(
        filledGroupedData,
        (item) =>
          (maxBy(item, "y") as TData).y /
          (
            minBy(item, (o) => {
              if (o.y === 0) return Infinity;
              return o.y;
            }) as TData
          ).y
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
      height: 330,
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
        domain: [1 / (maxDomain + AXIS_OFFSET), maxDomain + AXIS_OFFSET],
        grid: true,
      },
      color: {
        domain: domains,
        range: OrdinalRange,
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
          filledGroupedData[selectedValue.z]?.findIndex((item) =>
            isEqual(item, selectedValue)
          )
        );
      }
    };

    chartRef.current?.append(chart);

    return () => chart.remove();
  }, [normalizeIndex, filledData, filledGroupedData, domains]);

  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );

  if (!data?.length)
    return (
      <div className="flex h-full items-center justify-center">
        <Empty />
      </div>
    );

  const handleDomainChange = (domain: string) => {
    return () => {
      const isExcluded = excludedDomain?.includes(domain);
      if (isExcluded) {
        setExcludedDomain((prev) => prev.filter((item) => item !== domain));
      } else {
        if (domains.length - 1 === excludedDomain.length) {
          message.info("Please select at least one asset");
          return;
        }
        setExcludedDomain((prev) => [...prev, domain]);
      }
    };
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1" ref={chartRef} />
      <div className="flex items-center overflow-x-auto scrollbar-hidden py-4">
        <div className="flex gap-x-4">
          {domains.map((domain, index) => {
            const isExcluded = excludedDomain?.includes(domain);
            const backgroundColor = OrdinalRange[index];
            return (
              <Tag
                key={domain}
                className={clsx(
                  "flex cursor-pointer items-center rounded-md border border-neutral-3 bg-neutral-2 px-2 py-0.5 text-sm",
                  isExcluded ? "opacity-50" : ""
                )}
                onClick={handleDomainChange(domain)}
              >
                <div
                  className="mr-2 h-4 w-4"
                  style={{
                    backgroundColor,
                  }}
                />
                <div className="whitespace-nowrap">{domain}</div>
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
