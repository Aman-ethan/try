"use client";

import Statement from "./Statement";
import { TableColumnsType } from "antd";

const Columns: TableColumnsType = [
  {
    title: "Trade Action",
    key: "trade-action",
    dataIndex: "trade_action",
    width: 105,
  },
  {
    title: "Asset Class",
    key: "asset-class",
    dataIndex: "asset_class",
    width: 105,
  },
  {
    title: "ISIN",
    key: "isin",
    dataIndex: "isin",
    width: 125,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    width: 220,
  },
  {
    title: "Currency",
    key: "currency",
    width: 105,
    dataIndex: "currency",
  },
  {
    title: "Trade Date",
    key: "trade-date",
    dataIndex: "trade_date",
    width: 125,
  },
  {
    title: "Settlement Date",
    key: "settlement-date",
    dataIndex: "settlement_date",
    width: 150,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    width: 125,
  },
];

export default function TradeStatement() {
  return <Statement columns={Columns} />;
}
