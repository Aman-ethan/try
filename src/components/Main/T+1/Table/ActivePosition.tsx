"use client";

import { TableColumnsType } from "antd";
import { TCurrency } from "@/interfaces/Main";
import TooltipText from "@/components/Typography/ToolTipText";
import ClampedText from "@/components/Typography/ClampedText";
import TradeTable from ".";
import HashTag from "../../General/HashTag";
import CurrencyTag from "../../General/CurrencyTag";

interface IActivePosition {
  id: string;
  client_name: string;
  security_name: string;
  security: string;
  market_value_reporting_currency: number;
  market_value: number;
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
    key: "client_name",
    dataIndex: "client_name",
    width: 115,
  },
  {
    title: "Security ID",
    key: "security__in",
    dataIndex: "security",
    width: 140,
  },
  {
    title: "Security Name",
    key: "security__name__in",
    dataIndex: "security_name",
    width: 220,
    render: (security_name) => <ClampedText text={security_name} />,
  },
  {
    title: "Asset Class",
    key: "asset_class__in",
    dataIndex: "asset_class",
    width: 135,
  },
  {
    title: "Custodian Name",
    key: "custodian_name",
    dataIndex: "custodian_name",
    width: 145,
  },
  {
    title: "Account Number",
    key: "relationship_number",
    dataIndex: "relationship_number",
    sorter: true,
    width: 175,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    sorter: true,
    render: (text) => <TooltipText value={text} type="quantity" />,
    width: 100,
    align: "right",
  },
  {
    title: "Currency",
    key: "currency",
    dataIndex: "currency",
    render: (currency) => <CurrencyTag currency={currency} />,
    width: 125,
  },
  {
    title: "Average Price",
    key: "average_price",
    dataIndex: "average_price",
    sorter: true,
    render: (text) => <TooltipText value={text} type="price" />,
    width: 140,
    align: "right",
  },
  {
    title: "MTM Price",
    key: "mtm_price",
    dataIndex: "mtm_price",
    sorter: true,
    render: (text) => <TooltipText value={text} type="price" />,
    width: 115,
    align: "right",
  },
  {
    title: "MTM Local CCY",
    key: "market_value",
    dataIndex: "market_value",
    sorter: true,
    render: (text) => <TooltipText value={text} type="price" />,
    width: 140,
  },
  {
    title: "MTM RPT CCY",
    key: "market_value_reporting_currency",
    dataIndex: "market_value_reporting_currency",
    sorter: true,
    render: (text) => <TooltipText value={text} type="price" />,
    width: 140,
  },
  {
    title: "Unrealized P/L",
    key: "unrealised_pl",
    dataIndex: "unrealised_pl",
    sorter: true,
    render: (text) => <TooltipText value={text} type="price" />,
    width: 175,
    align: "right",
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
  return <TradeTable edit={false} urlKey={URLs.get} columns={Columns} />;
}
