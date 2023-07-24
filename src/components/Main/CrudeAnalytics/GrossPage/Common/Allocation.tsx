"use client";

import { useState } from "react";
import { ProList } from "@ant-design/pro-components";
import AnalyticsPieChart from "../../Charts/AnalyticsPieChart";
import AnalyticsModal from "./AnalyticsModal";

interface IAllocationProps {
  title: string;
}

// This is just placeholder , it will be replaced with dynamic data from pie chart
const dataSource = [
  {
    title: "Deposit",
  },
  {
    title: "Fixed Income",
  },
  {
    title: "Equity",
  },
  {
    title: "Cash",
  },
];

export default function Allocation({ title }: IAllocationProps) {
  const mockData = [
    {
      type: "Deposite",
      value: 49,
    },
    {
      type: "Fixed Income",
      value: 33,
    },
    {
      type: "Equity",
      value: 13,
    },
    {
      type: "Cash",
      value: 5,
    },
  ];
  const totalValue = mockData.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.value;
  }, 0);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSegmentClick = () => setModalVisible(true);
  const handleModalClose = () => setModalVisible(false);
  return (
    <div className="flex-1 space-y-4 text-center">
      <h2 className="text-xl font-medium tab:text-2xl">{title}</h2>
      <div className="tab:flex tab:items-center lap:flex-col">
        <AnalyticsModal
          title={title}
          isModalOpen={isModalVisible}
          handleModalClose={handleModalClose}
        />
        <AnalyticsPieChart
          data={mockData}
          totalValue={totalValue}
          handleSegmentClick={handleSegmentClick}
        />
        <ProList
          // data source will be replaced with dynamic data from pie chart
          dataSource={dataSource}
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
