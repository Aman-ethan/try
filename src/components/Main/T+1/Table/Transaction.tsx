"use client";

import { formatQuantity, formatTableDate } from "@/lib/format";
import { TableColumnsType } from "antd";
import { capitalize } from "lodash";
import TradeTable from ".";
import HashTag from "../../General/HashTag";

const URLs = {
  get: "/blotter-trade/",
  put: "/blotter-trade/{id}/",
  delete: "/blotter-trade/{id}/",
};

const Columns: TableColumnsType = [
  {
    title: "Trade Action",
    key: "trade-action",
    dataIndex: "trade_action",
    render: capitalize,
    width: 130,
  },
  {
    title: "Security ID",
    key: "security",
    dataIndex: "security",
    width: 125,
  },
  {
    title: "Asset Class",
    key: "asset-class",
    dataIndex: "asset_class",
    width: 105,
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    dataIndex: "custodian_name",
    width: 140,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    dataIndex: "relationship_number",
    width: 160,
  },
  {
    title: "Trade Date",
    key: "trade-date",
    dataIndex: "trade_date",
    render: formatTableDate,
    sorter: true,
    width: 125,
  },
  {
    title: "Settlement Date",
    key: "settlement-date",
    dataIndex: "settlement_date",
    render: formatTableDate,
    sorter: true,
    width: 150,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    render: formatQuantity,
    width: 125,
  },
  {
    title: "Cost Price",
    key: "cost-price",
    dataIndex: "cost_price",
    width: 135,
  },
  {
    title: "MTM Price",
    key: "mtm-price",
    dataIndex: "mtm_price",
    width: 135,
  },
  {
    title: "Realized P/L",
    key: "realized-pl",
    dataIndex: "realised_pl",
    width: 135,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: ["meta", "tags"],
    render: (tags: string[]) => <HashTag tags={tags} />,
    width: 335,
  },
];

export default function TransactionTable() {
  return <TradeTable urlKey={URLs.get} columns={Columns} />;
}
