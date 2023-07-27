"use client";

import { useState } from "react";
import { ProList } from "@ant-design/pro-components";
import AnalyticsPieChart from "../../Charts/AnalyticsPieChart";
import AnalyticsModal from "./AnalyticsModal";
import { IPieData } from "@/interfaces/Main";

interface IAllocationProps {
  title: string;
  data?: IPieData[];
}

export default function Allocation({ title, data = [] }: IAllocationProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSegmentClick = () => setModalVisible(true);
  const handleModalClose = () => setModalVisible(false);

  const totalValue =
    data?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.value;
    }, 0) || 0;

  return (
    <div className="flex-1 space-y-4 text-center">
      <h2 className="text-xl font-medium tab:text-2xl capitalize">
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
        />
        <ProList
          dataSource={data}
          metas={{
            title: {
              dataIndex: "title",
            },
            extra: {
              render: () => [<p>50%</p>],
            },
          }}
          className="tab:flex-1 lap:w-full"
        />
      </div>
    </div>
  );
}
