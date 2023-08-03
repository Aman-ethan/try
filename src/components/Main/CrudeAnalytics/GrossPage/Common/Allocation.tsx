"use client";

import { useState } from "react";
import { Empty } from "antd";
import { ProList } from "@ant-design/pro-components";
import * as d3 from "d3";
import {
  IPercentageData,
  IPieData,
  mapDataToPieChartData,
} from "@/constants/pieChartConfig";
import AnalyticsPieChart from "../../Charts/AnalyticsPieChart";
import AnalyticsModal from "./AnalyticsModal";

interface IAllocationProps {
  title: string;
  data?: IPieData[];
}

export default function Allocation({ title, data = [] }: IAllocationProps) {
  const totalValue =
    data?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.value;
    }, 0) || 0;

  const percentageData: IPercentageData[] = data.map((type) => ({
    ...type,
    percentage: parseFloat(((type.value / totalValue) * 100).toFixed(2)),
  }));

  const z = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(data?.map((d: any) => d.type));

  const colorMap: { [key: string]: string } = {};
  z.domain().forEach((d) => {
    colorMap[d] = z(d);
  });

  const proListData = mapDataToPieChartData(percentageData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const handleSegmentClick = (type: string) => {
    setSelectedType(type);
    setModalVisible(true);
  };
  const handleModalClose = () => setModalVisible(false);
  const pieChartCategory = title.replace("Gross Allocation by ", "");
  return (
    <div className="flex-1 space-y-4 text-center">
      <h2 className="text-xl font-medium capitalize tab:text-2xl">
        {pieChartCategory}
      </h2>
      <div className="flex flex-col items-center tab:flex-row  lap:flex-col">
        <AnalyticsModal
          isModalOpen={isModalVisible}
          handleModalClose={handleModalClose}
          data={data}
          selectedType={selectedType}
          category={pieChartCategory}
        />
        <AnalyticsPieChart
          data={percentageData}
          totalValue={totalValue}
          handleSegmentClick={handleSegmentClick}
          colorMap={colorMap}
        />
        {proListData.length !== 0 ? (
          <ProList
            // data source will be replaced with dynamic data from pie chart
            rowClassName="p-2"
            dataSource={proListData}
            metas={{
              title: {
                dataIndex: "title",
                render: (dom, entity) => (
                  <div className="flex items-center justify-center gap-x-2">
                    <div
                      style={{
                        backgroundColor: colorMap[entity.type],
                        width: "10px",
                        height: "10px",
                      }}
                    />
                    <p className="break-words text-left">{entity.type}</p>
                  </div>
                ),
              },
              extra: {
                render: (_: any, record: any) => [<p>{record.percentage}%</p>],
              },
            }}
            className="w-full tab:w-auto tab:flex-1 lap:w-full max-h-52 overflow-y-scroll"
          />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
