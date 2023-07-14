"use client";

import { ActionColumn } from "@/constants/table";
import { formatPrice, formatQuantity, formatTableDate } from "@/lib/format";
import { TableColumnsType } from "antd";
import { capitalize } from "lodash";
import TradeTable from ".";
import HashTag from "../../General/HashTag";
import MoreMenu, { DeleteItem, EditItem } from "../../General/MoreMenu";
import AddTradeForm from "../Form/AddTrade";

interface ITransactionStatement {
  id: string;
  trade_action: string;
  security: string;
  asset_class: string;
  custodian_name: string;
  relationship_number: string;
  trade_date: string;
  settlement_date: string;
  quantity: number;
  cost_price: number;
  mtm_price: number;
  realised_pl: number;
  currency: string;
  goal: string;
  meta: { tags: string[] };
}

interface IActionProps {
  id: string;
}

const URLs = {
  get: "/blotter-trade/",
  put: "/blotter-trade/{id}/",
  delete: "/blotter-trade/{id}/",
};

function Action({ id }: IActionProps) {
  return (
    <MoreMenu
      items={[
        {
          key: "edit",
          label: (
            <EditItem
              drawerTitle="Edit Trade"
              form={AddTradeForm}
              id={id}
              urls={URLs}
            />
          ),
        },
        {
          key: "delete",
          label: <DeleteItem id={id} urls={URLs} />,
        },
      ]}
    />
  );
}

const Columns: TableColumnsType<ITransactionStatement> = [
  {
    title: "Client",
    key: "client",
    dataIndex: "client_name",
    width: 115,
  },
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
    sorter: true,
    width: 175,
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
    render: (price, record) => formatPrice(price, record.currency),
    width: 135,
  },
  {
    title: "MTM Price",
    key: "mtm-price",
    dataIndex: "mtm_price",
    render: (price, record) => formatPrice(price, record.currency),
    width: 135,
  },
  {
    title: "Realized P/L",
    key: "realized-pl",
    dataIndex: "realised_pl",
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
  {
    ...ActionColumn,
    render: (id) => <Action id={id} />,
  },
];

export default function TransactionTable() {
  return <TradeTable urlKey={URLs.get} columns={Columns} />;
}
