"use client";

import { ColumnsType } from "antd/es/table";
import Table from "../../Table/Table";
import { MoreOutlined, ThunderboltOutlined } from "@ant-design/icons";

const Columns: ColumnsType = [
  {
    title: "Asset Class",
    key: "asset-class",
    width: 105,
  },
  {
    title: "ISIN",
    key: "isin",
    width: 125,
  },
  {
    title: "Description",
    key: "description",
    width: 230,
  },
  {
    title: "Currency",
    key: "currency",
    width: 105,
  },
  {
    title: "Quantity",
    key: "quantity",
    width: 125,
  },
  {
    title: "Unit Cost Price",
    key: "unit-cost-price",
    width: 135,
  },
  {
    title: "Cost Value",
    key: "cost-value",
    width: 105,
  },
  {
    title: "Market Value",
    key: "market-value",
    width: 135,
  },
  {
    title: <ThunderboltOutlined />,
    key: "action",
    fixed: "right",
    render: () => <MoreOutlined />,
    width: 55,
    align: "center",
  },
];

export default function TradeStatement() {
  return (
    <Table
      size="middle"
      columns={Columns}
      scroll={{
        x: Columns.reduce((acc, { width }) => acc + Number(width), 0),
        y: "h-[calc(100vh-24rem)]",
      }}
    />
  );
}
