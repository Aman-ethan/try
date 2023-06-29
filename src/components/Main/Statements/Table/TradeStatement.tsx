"use client";

import { TableColumnsType } from "antd";
import { formatNumber, formatTableDate } from "@/lib/format";
import { capitalize } from "lodash";
import Statement from "./Statement";
import CurrencyTag from "../../General/CurrencyTag";

const Columns: TableColumnsType = [
  {
    title: "Trade Action",
    key: "trade-action",
    dataIndex: "trade_action",
    width: 105,
    render: (action) => (
      <span className="font-medium text-neutral-13/80">
        {action ? "Buy" : "Sell"}
      </span>
    ),
  },
  {
    title: "Asset Class",
    key: "asset-class",
    dataIndex: "asset_class",
    width: 105,
    render: capitalize,
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
    render: (currency) => <CurrencyTag currency={currency} />,
  },
  {
    title: "Trade Date",
    key: "trade-date",
    dataIndex: "trade_date",
    width: 125,
    render: formatTableDate,
  },
  {
    title: "Settlement Date",
    key: "settlement-date",
    dataIndex: "settlement_date",
    width: 150,
    render: formatTableDate,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    width: 125,
    render: (quantity) => formatNumber("quantity", quantity),
  },
];

const URLs = {
  get: "/statement/trade/",
};

export default function TradeStatement() {
  return <Statement urls={URLs} columns={Columns} />;
}
