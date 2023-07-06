"use client";

import Title from "@/components/Typography/Title";
import { ProList } from "@ant-design/pro-components";

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
  return (
    <div className="flex-1 space-y-4 text-center">
      <Title>{title}</Title>
      {/* Pie chart comes here */}
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
      />
    </div>
  );
}
