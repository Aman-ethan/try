import { Table } from "antd";

const data = [
  {
    key: "1",
    liabilities: "Real Estate",
    totalValue: "20.2M",
    percentage: "51.79",
  },
  {
    key: "2",
    liabilities: "Total Liabilities",
    totalValue: "-2.35M",
    percentage: "6.02%",
  },
];

const tableClassName =
  "text-left text-sm tab:text-md lap:text-lg font-light text-neutral-9";

const columns = [
  {
    title: "Liabilities",
    dataIndex: "liabilities",
    key: "liabilities",
    className: tableClassName,
  },
  {
    title: "Total Value",
    dataIndex: "totalValue",
    key: "totalValue",
    className: tableClassName,
  },
  {
    title: "in %",
    dataIndex: "percentage",
    key: "percentage",
    className: tableClassName,
  },
];

export default function LiabilityChart() {
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      className="mb-2"
    />
  );
}
