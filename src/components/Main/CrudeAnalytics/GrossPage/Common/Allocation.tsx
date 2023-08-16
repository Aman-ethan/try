"use client";

import { useState } from "react";
import { Empty, Tooltip } from "antd";
import { ProList } from "@ant-design/pro-components";
import * as d3 from "d3";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import clsx from "clsx";
import {
  IPercentageData,
  IPieData,
  processDataForPieChart,
} from "@/constants/pieChartConfig";
import { OrdinalRange } from "@/constants/strings";
import Title from "@/components/Typography/Title";
import AnalyticsPieChart from "../../Charts/AnalyticsPieChart";
import AnalyticsModal, { TCategory } from "./AnalyticsModal";

interface IAllocationProps {
  title: string;
  data?: IPieData[];
}

interface IPieChartLegendProps {
  data: IPercentageData[];
  colorMap: { [key: string]: string };
}

function PieChartLegend({ data, colorMap }: IPieChartLegendProps) {
  const [showAllLegend, setShowAllLegend] = useState(false);
  return data.length !== 0 ? (
    <ProList
      className={clsx(
        "w-full tab:w-auto tab:flex-1 lap:w-full max-h-56 overflow-y-visible legend",
        showAllLegend ? "shadow-legend" : ""
      )}
      rowClassName="p-2"
      dataSource={showAllLegend ? data : data.slice(0, 4)}
      metas={{
        title: {
          dataIndex: "title",
          render: (_dom, entity) => (
            <div className="flex items-center justify-center gap-x-2">
              <div
                className="h-2.5 w-2.5"
                style={{
                  backgroundColor: colorMap[entity.type],
                }}
              />
              <Tooltip
                title={entity.type}
                className="line-clamp-1 text-left font-normal"
              >
                {entity.type}
              </Tooltip>
            </div>
          ),
        },
        extra: {
          render: (_: unknown, record: IPercentageData) => [
            <p key={record.type}>{record.percentage}%</p>,
          ],
        },
      }}
      footer={
        data.length > 4 && (
          <button
            type="button"
            className="flex items-center gap-x-2 text-neutral-10 cursor-pointer"
            onClick={() => setShowAllLegend((prev) => !prev)}
          >
            Show {showAllLegend ? "less" : "all"}
            {showAllLegend ? (
              <UpOutlined className="text-xs" />
            ) : (
              <DownOutlined className="text-xs" />
            )}
          </button>
        )
      }
    />
  ) : (
    <Empty />
  );
}

export default function Allocation({ title, data = [] }: IAllocationProps) {
  const { grossValue: totalValue, pieChartData } = processDataForPieChart(data);

  const z = d3
    .scaleOrdinal(OrdinalRange)
    .domain(data?.map((d: IPieData) => d.type));

  const colorMap: { [key: string]: string } = {};
  z.domain().forEach((d) => {
    colorMap[d] = z(d);
  });

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const handleSegmentClick = (type: string) => {
    setSelectedType(type);
    setIsOverlayVisible(true);
  };
  const handleIsOverlayClose = () => setIsOverlayVisible(false);

  const pieChartCategory = title
    .replace("Gross Allocation by ", "")
    .replace(" ", "_") as TCategory;

  return (
    <div className="space-y-8 text-center desk:flex-1">
      <Title level={3}>{pieChartCategory.split("_").join(" ")}</Title>
      <div className="flex flex-col items-center gap-y-2 tab:flex-row lap:flex-col">
        <AnalyticsModal
          isOverlayVisible={isOverlayVisible}
          handleIsOverlayClose={handleIsOverlayClose}
          data={data}
          selectedType={selectedType}
          category={pieChartCategory}
        />
        <AnalyticsPieChart
          data={pieChartData}
          totalValue={totalValue}
          handleSegmentClick={handleSegmentClick}
          colorMap={colorMap}
        />
        <PieChartLegend data={pieChartData} colorMap={colorMap} />
      </div>
    </div>
  );
}
