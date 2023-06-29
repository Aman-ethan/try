"use client";

import { TableColumnsType } from "antd";
import { formatNumber } from "@/lib/format";
import Statement from "./Statement";
import CurrencyTag from "../../General/CurrencyTag";

function formatPrice(price: number, record: unknown) {
  return formatNumber("price", price, {
    currency: (record as Record<"original_currency", string>).original_currency,
  });
}

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
    render: (currency) => <CurrencyTag currency={currency} />,
  },
  {
    title: "Quantity",
    key: "quantity",
    width: 125,
    dataIndex: "quantity",
    render: (quantity) => formatNumber("quantity", quantity),
  },
  {
    title: "Unit Cost Price",
    key: "unit-cost-price",
    width: 135,
    dataIndex: "cost_price",
    render: formatPrice,
  },
  {
    title: "Cost Value",
    key: "cost-value",
    width: 105,
    dataIndex: "cost_value",
    render: formatPrice,
  },
  {
    title: "Market Value",
    key: "market-value",
    width: 135,
    dataIndex: "mtm_price",
    render: formatPrice,
  },
];

const URLs = {
  get: "/statement/position/",
};

export default function PositionStatement() {
  return <Statement urls={URLs} columns={Columns} />;
}
