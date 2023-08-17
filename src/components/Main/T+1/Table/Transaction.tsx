"use client";

import { TableColumnsType } from "antd";
import { capitalize } from "lodash";
import { MenuItemClassName } from "@/constants/strings";
import { ActionColumn } from "@/constants/table";
import { IBlotterTransactionStatement } from "@/interfaces/Main";
import { formatTableDate } from "@/lib/format";
import TooltipText from "@/components/Typography/ToolTipText";
import TradeTable from ".";
import HashTag from "../../General/HashTag";
import MoreMenu, { DeleteItem } from "../../General/MoreMenu";
import EditTradeDrawer from "../General/EditTradeDrawer";
import CurrencyTag from "../../General/CurrencyTag";

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
              button={
                <button className={MenuItemClassName} type="button">
                  Edit
                </button>
              }
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
    title: "Client Name",
    key: "client_name",
    dataIndex: "client_name",
    width: 115,
  },
  {
    title: "Trade Action",
    key: "trade_action__in",
    dataIndex: "trade_action",
    render: capitalize,
    width: 130,
  },
  {
    title: "Security ID",
    key: "security__in",
    dataIndex: "security",
    width: 140,
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
    width: 140,
  },
  {
    title: "Account Number",
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
    render: (text) => <TooltipText value={text} />,
    align: "right",
    width: 125,
  },
  {
    title: "Currency",
    key: "currency",
    dataIndex: "currency",
    render: (currency) => <CurrencyTag currency={currency} />,
    width: 120,
  },
  {
    title: "Cost Price",
    key: "cost_price",
    dataIndex: "cost_price",
    render: (text) => <TooltipText value={text} />,
    align: "right",
    width: 135,
  },
  {
    title: "MTM Price",
    key: "mtm_price",
    dataIndex: "mtm_price",
    render: (text) => <TooltipText value={text} />,
    width: 135,
    align: "right",
  },
  {
    title: "Realized P/L",
    key: "realised_pl",
    dataIndex: "realised_pl",
    render: (text) => <TooltipText value={text} />,
    width: 135,
    align: "right",
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
