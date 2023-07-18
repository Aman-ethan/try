"use client";

import { ActionColumn } from "@/constants/table";
import { IBlotterTransactionStatement } from "@/interfaces/Main";
import { formatPrice, formatQuantity, formatTableDate } from "@/lib/format";
import { TableColumnsType } from "antd";
import { capitalize } from "lodash";
import TradeTable from ".";
import HashTag from "../../General/HashTag";
import MoreMenu, { DeleteItem } from "../../General/MoreMenu";
import EditTradeDrawer from "../General/EditTradeDrawer";

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
            <EditTradeDrawer
              id={id}
              button={<button type="button">Edit</button>}
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

const Columns: TableColumnsType<IBlotterTransactionStatement> = [
  {
    title: "Client",
    key: "client_name",
    dataIndex: "client_name",
    width: 115,
  },
  {
    title: "Trade Action",
    key: "trade_action",
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
    key: "asset_class",
    dataIndex: "asset_class",
    width: 105,
  },
  {
    title: "Custodian Name",
    key: "custodian_name",
    dataIndex: "custodian_name",
    width: 140,
  },
  {
    title: "Relationship Number",
    key: "relationship_number",
    dataIndex: "relationship_number",
    sorter: true,
    width: 175,
  },
  {
    title: "Trade Date",
    key: "trade_date",
    dataIndex: "trade_date",
    render: formatTableDate,
    sorter: true,
    width: 125,
  },
  {
    title: "Settlement Date",
    key: "settlement_date",
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
    key: "cost_price",
    dataIndex: "cost_price",
    render: (price, record) => formatPrice(price, record.currency),
    width: 135,
  },
  {
    title: "MTM Price",
    key: "mtm_price",
    dataIndex: "mtm_price",
    render: (price, record) => formatPrice(price, record.currency),
    width: 135,
  },
  {
    title: "Realized P/L",
    key: "realized_pl",
    dataIndex: "realised_pl",
    render: (pl, record) => formatPrice(pl, record.currency),
    width: 135,
  },
  {
    title: "Tags",
    key: "meta.tags",
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