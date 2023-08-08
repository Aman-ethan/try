import * as Plot from "@observablehq/plot";
import { Spin, message, Tag, Empty } from "antd";
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
import { CloseCircleOutlined } from "@ant-design/icons";
import { SegmentedValue } from "antd/es/segmented";
import { IAssetNetWorth } from "@/interfaces/Main";
import TickerSelect from "./TickerSelect";
import AssetSelect from "./AssetSelect";

type TData = IAssetNetWorth["data"][0];

interface IIndexChartProps {
  data?: TData[];
  loading?: boolean;
  value?: SegmentedValue;
  ticker: string[];
  setTicker: (_ticker: string[]) => void;
}

interface IFillMissingDataParams {
  data: Record<string, TData[]>;
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
const MAX_SELECTIONS = 5;

export default function PerformanceChart({
  data,
  loading,
  value,
  setTicker,
  ticker,
}: IIndexChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [normalizeIndex, setNormalizeIndex] = useState(0);
  const [excludedDomain, setExcludedDomain] = useState<string[]>([]);
  const chartScaleRef = useRef<Plot.Scale>();

  const [filledData, filledGroupedData, assets] = useMemo(() => {
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

    const _assets = Object.keys(_groupedData);

    if (_assets.length >= MAX_SELECTIONS) {
      setTicker(_assets.slice(0, MAX_SELECTIONS));
    }

    excludedDomain.forEach((domain) => {
      delete _groupedData[domain];
    });

    const _filledGroupedData = fillMissingData({
      data: _groupedData,
      xticks,
    });

    const _filledData = Object.values(_filledGroupedData).flat();

    return [_filledData, _filledGroupedData, _assets];
  }, [data, excludedDomain, setTicker]);

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
      // width: 1000,
      width: chartRef.current?.clientWidth,
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
          filledGroupedData[selectedValue.z]?.findIndex((item) =>
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
  }, [normalizeIndex, filledData, filledGroupedData]);

  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );

  const handleTagClose = (removedTag: string) => {
    if (assets.length - 1 === excludedDomain.length) {
      message.info("Please select at least one asset");
      return;
    }
    const updatedOptions = assets.filter((tag) => tag !== removedTag);
    setTicker(updatedOptions);
  };

  const handleOptionChange = (_value: string) => {
    if (assets.length >= MAX_SELECTIONS) {
      message.error("Limit reached, cannot add more than 5 tickers");
      return; // Limit reached, do not add more options
    }
    setTicker(Array.from(new Set([...ticker, _value])));
  };

  const handleDomainChange = (domain: string) => {
    return () => {
      const isExcluded = excludedDomain?.includes(domain);
      if (isExcluded) {
        setExcludedDomain((prev) => prev.filter((item) => item !== domain));
      } else {
        if (assets.length - 1 === excludedDomain.length) {
          message.info("Please select at least one asset");
          return;
        }
        setExcludedDomain((prev) => [...prev, domain]);
      }
    };
  };

  return (
    <>
      <div className="flex flex-col">
        {value === "ticker" ? (
          <TickerSelect handleOptionChange={handleOptionChange} />
        ) : (
          <AssetSelect handleOptionChange={handleOptionChange} />
        )}
        <div className="flex w-full max-w-lg items-center py-6">
          <div className="flex gap-x-4">
            {assets?.map((domain, index) => {
              const isExcluded = excludedDomain?.includes(domain);
              const backgroundColor = (
                chartScaleRef.current?.range as TScaleRecord
              )?.[index];
              return (
                <>
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
                  <CloseCircleOutlined onClick={() => handleTagClose(domain)} />
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {data?.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <Empty description="No data" />
          </div>
        )}
        <div ref={chartRef} />
      </div>
    </>
  );
}
