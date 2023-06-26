"use client";

import { TableColumnsType } from "antd";
import Statement from "./Statement";

const Columns: TableColumnsType = [
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
];

export default function PositionStatement() {
  return <Statement columns={Columns} />;
}
