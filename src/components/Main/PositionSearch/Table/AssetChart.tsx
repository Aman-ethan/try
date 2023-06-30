import { Table } from "antd";

const data = [
  {
    key: "1",
    assetClass: "Real Estate",
    totalValue: "20.2M",
    percentage: "51.79",
  },
  {
    key: "2",
    assetClass: "Exchange Traded Fund",
    totalValue: "15.9M",
    percentage: "40.76",
  },
  {
    key: "3",
    assetClass: "Total Assets",
    totalValue: "39M",
    percentage: "100%",
  },
];

const tableClassName = "text-left text-lg font-light text-neutral-9";

const columns = [
  {
    title: "Asset Class",
    dataIndex: "assetClass",
    key: "assetClass",
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

export default function AssetChart() {
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      className="mb-2"
    />
  );
}
