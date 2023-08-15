"use client";

import { TableColumnsType } from "antd";
import Table from "@/components/Main/Table";

const columns: TableColumnsType = [
  {
    title: "ISIN",
    dataIndex: "isin",
    key: "isin",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Average Price",
    dataIndex: "averagePrice",
    key: "averagePrice",
  },
  {
    title: "MTM Price",
    dataIndex: "mtmPrice",
    key: "mtmPrice",
  },
  {
    title: "Market Value",
    dataIndex: "marketValue",
    key: "marketValue",
  },
  {
    title: "Unrealized P&L",
    dataIndex: "unrealizedPL",
    key: "unrealizedPL",
  },
];

const pagination = {
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30"],
};

export default function CrudeAnalyticsPage() {
  return <Table columns={columns} pagination={pagination} />;
}
