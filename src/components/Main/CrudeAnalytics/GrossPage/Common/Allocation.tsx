"use client";

import { useState } from "react";
import { ProList } from "@ant-design/pro-components";
import * as d3 from "d3";
import { Empty } from "antd";
import { IPieData, mapDataToPieChartData } from "@/constants/pieChartConfig";
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

  const z = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(data?.map((d: any) => d.type));

  const colorMap: { [key: string]: string } = {};
  z.domain().forEach((d) => {
    colorMap[d] = z(d);
  });

  const proListData = mapDataToPieChartData(data);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSegmentClick = () => setModalVisible(true);
  const handleModalClose = () => setModalVisible(false);

  return (
    <div className="flex-1 space-y-4 text-center">
      <h2 className="text-xl font-medium capitalize tab:text-2xl">
        {title.replace("Gross Allocation by ", "")}
      </h2>
      <div className="tab:flex tab:items-center lap:flex-col">
        <AnalyticsModal
          title={title}
          isModalOpen={isModalVisible}
          handleModalClose={handleModalClose}
        />
        <AnalyticsPieChart
          data={data}
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
                  <div className="flex items-center justify-center gap-x-4">
                    <div
                      style={{
                        backgroundColor: colorMap[entity.type],
                        width: "10px",
                        height: "10px",
                      }}
                    />
                    {entity.type}
                  </div>
                ),
              },
              extra: {
                render: (_: any, record: any) => [<p>{record.value}%</p>],
              },
            }}
            className="tab:flex-1 lap:w-full"
          />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
