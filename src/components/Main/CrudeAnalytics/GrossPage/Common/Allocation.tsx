"use client";

import { useState } from "react";
import { Empty } from "antd";
import { ProList } from "@ant-design/pro-components";
import * as d3 from "d3";
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
    <div className="flex-1 space-y-4 text-center">
      <Title level={3}>{pieChartCategory.split("_").join(" ")}</Title>
      <div className="flex flex-col items-center tab:flex-row lap:flex-col space-y-4">
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
        {pieChartData.length !== 0 ? (
          <ProList
            className="w-full tab:w-auto tab:flex-1 lap:w-full desk:px-9"
            rowClassName="p-2"
            dataSource={pieChartData.slice(0, 4)}
            metas={{
              title: {
                dataIndex: "title",
                render: (_dom, entity) => (
                  <div className="flex items-center justify-center gap-x-2">
                    <div
                      className="w-2.5 h-2.5"
                      style={{
                        backgroundColor: colorMap[entity.type],
                      }}
                    />
                    <p className="break-words text-left font-normal">
                      {entity.type}
                    </p>
                  </div>
                ),
              },
              extra: {
                render: (_: unknown, record: IPercentageData) => [
                  <p key={record.type}>{record.percentage}%</p>,
                ],
              },
            }}
          />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
