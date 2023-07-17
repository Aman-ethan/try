"use client";

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
      <h2 className="text-xl font-medium tab:text-2xl">{title}</h2>
      <div className="tab:flex tab:items-center lap:flex-col">
        <h1 className="tab:flex-1 lap:w-full">Pie chart</h1>
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
