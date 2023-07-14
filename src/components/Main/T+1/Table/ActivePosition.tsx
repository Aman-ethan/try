"use client";

import { TableColumnsType } from "antd";
import { formatPrice, formatQuantity } from "@/lib/format";
import { TCurrency } from "@/interfaces/Main";
import TradeTable from ".";
import HashTag from "../../General/HashTag";

interface IActivePosition {
  id: string;
  client_name: string;
  security: string;
  asset_class: string;
  custodian_name: string;
  relationship_number: string;
  quantity: number;
  average_price: number;
  mtm_price: number;
  unrealised_pl: number;
  currency: TCurrency;
}

const URLs = {
  get: "/position/active/",
  put: "/position/active/{id}/",
  delete: "/position/active/{id}/",
};

const Columns: TableColumnsType<IActivePosition> = [
  {
    title: "Client Name",
    key: "client-name",
    dataIndex: "client_name",
    width: 115,
  },
  {
    title: "Security ID",
    key: "security-id",
    dataIndex: "security",
    width: 140,
  },
  {
    title: "Asset Class",
    key: "asset-class",
    dataIndex: "asset_class",
    width: 135,
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    dataIndex: "custodian_name",
    width: 145,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    dataIndex: "relationship_number",
    sorter: true,
    width: 175,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    sorter: true,
    render: formatQuantity,
    width: 125,
  },
  {
    title: "Average Price",
    key: "average-price",
    dataIndex: "average_price",
    sorter: true,
    render: (price, record) => formatPrice(price, record.currency),
    width: 135,
  },
  {
    title: "MTM Price",
    key: "mtm-price",
    dataIndex: "mtm_price",
    sorter: true,
    render: (price, record) => formatPrice(price, record.currency),
    width: 130,
  },
  {
    title: "Unrealized P/L",
    key: "unrealized-pl",
    dataIndex: "unrealised_pl",
    sorter: true,
    render: (pl, record) => formatPrice(pl, record.currency),
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

export default function ActivePositionTable() {
  return <TradeTable urlKey={URLs.get} columns={Columns} />;
}
