"use client";

import { TableColumnsType } from "antd";
import Statement from "./Statement";

const Columns: TableColumnsType = [
  {
    title: "Asset Class",
    key: "asset-class",
    width: 105,
    dataIndex: "asset_class",
  },
  {
    title: "ISIN",
    key: "isin",
    width: 125,
    dataIndex: "isin",
  },
  {
    title: "Description",
    key: "description",
    width: 230,
    dataIndex: "description",
  },
  {
    title: "Currency",
    key: "currency",
    width: 105,
    dataIndex: "original_currency",
  },
  {
    title: "Quantity",
    key: "quantity",
    width: 125,
    dataIndex: "quantity",
  },
  {
    title: "Unit Cost Price",
    key: "unit-cost-price",
    width: 135,
    dataIndex: "cost_price",
  },
  {
    title: "Cost Value",
    key: "cost-value",
    width: 105,
    dataIndex: "cost_value",
  },
  {
    title: "Market Value",
    key: "market-value",
    width: 135,
    dataIndex: "mtm_price",
  },
];

export default function PositionStatement() {
  return <Statement urlKey="/statement/position/" columns={Columns} />;
}
