"use client";

import { TCurrency } from "@/interfaces/Main";
import { formatPrice, formatQuantity, formatTableDate } from "@/lib/format";
import { ThunderboltOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import { capitalize } from "lodash";
import Statement from ".";
import CurrencyTag from "../../General/CurrencyTag";
import MoreMenu, { DeleteItem, EditItem } from "../../General/MoreMenu";
import TradeStatementForm from "../Form/TradeStatementForm";

interface IActionProps {
  id: string;
}

interface ITradeStatement {
  id: string;
  client_name: string;
  custodian_name: string;
  statement_date: string;
  reference_number: string;
  relationship_number: string;
  portfolio_number: string;
  isin: string;
  asset_class: string;
  trade_action: string;
  description: string;
  quantity: number;
  cost_price: number;
  currency: TCurrency;
  trade_date: string;
  settlement_date: string;
}

const URLs = {
  get: "/statement/trade/",
  delete: "/statement/trade/{id}/",
  put: "/statement/trade/{id}/",
};

function Action({ id }: IActionProps) {
  return (
    <MoreMenu
      items={[
        {
          key: "edit",
          label: (
            <EditItem
              id={id}
              urls={URLs}
              form={TradeStatementForm}
              drawerTitle="Edit Trade Statement"
            />
          ),
        },
        {
          key: "delete",
          label: <DeleteItem urls={URLs} id={id} />,
        },
      ]}
    />
  );
}

const Columns: TableColumnsType<ITradeStatement> = [
  {
    title: "Client",
    key: "client",
    dataIndex: "client_name",
    width: 105,
  },
  {
    title: "Custodian",
    key: "custodian",
    dataIndex: "custodian_name",
    width: 165,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    dataIndex: "relationship_number",
    width: 165,
  },
  {
    title: "Statement Date",
    key: "statement-date",
    dataIndex: "statement_date",
    render: formatTableDate,
    sorter: true,
    width: 150,
  },
  {
    title: "Reference Number",
    key: "reference-number",
    dataIndex: "reference_number",
    width: 150,
  },
  {
    title: "Security ID",
    key: "security-id",
    dataIndex: "isin",
    width: 140,
  },
  {
    title: "Asset Class",
    key: "asset-class",
    dataIndex: "asset_class",
    width: 130,
  },
  {
    title: "Trade Action",
    key: "trade-action",
    dataIndex: "trade_action",
    render: capitalize,
    width: 130,
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
    dataIndex: "currency",
    render: (currency) => <CurrencyTag currency={currency} />,
    width: 130,
  },
  {
    title: "Cost Price",
    key: "cost-price",
    dataIndex: "cost_price",
    render: (price, record) => formatPrice(price, record.currency),
    sorter: true,
    width: 135,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    render: formatQuantity,
    sorter: true,
    width: 125,
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
    fixed: "right",
    title: <ThunderboltOutlined />,
    key: "actions",
    width: 55,
    dataIndex: "id",
    align: "center",
    render: (id) => <Action id={id} />,
  },
];

export default function TradeStatement() {
  return <Statement urlKey={URLs.get} columns={Columns} />;
}
