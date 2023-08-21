"use client";

import { TableColumnsType } from "antd";
import { ActionColumn } from "@/constants/table";
import { formatTableDate } from "@/lib/format";
import ClampedText from "@/components/Typography/ClampedText";
import TooltipText from "@/components/Typography/ToolTipText";
import Statement from ".";
import CurrencyTag from "../../General/CurrencyTag";
import MoreMenu, { DeleteItem } from "../../General/MoreMenu";
import EditStatementDrawer from "../General/EditStatementDrawer";

interface IPositionStatement {
  id: string;
  client_name: string;
  statement_date: string;
  asset_class: string;
  isin: string;
  custodian_name: string;
  relationship_number: string;
  description: string;
  currency: string;
  quantity: number;
  cost_price: number;
}

const URLs = {
  get: "/statement/position/",
  delete: "/statement/position/{id}/",
};

function Action({ id }: { id: string }) {
  return (
    <MoreMenu
      items={[
        {
          key: "edit",
          label: <EditStatementDrawer id={id} layoutSegment="position" />,
        },
        {
          key: "delete",
          label: <DeleteItem id={id} urls={URLs} />,
        },
      ]}
    />
  );
}

const Columns: TableColumnsType<IPositionStatement> = [
  {
    title: "Client",
    key: "client",
    dataIndex: "client_name",
    width: 105,
  },
  {
    title: "Statement Date",
    key: "statement-date",
    dataIndex: "statement_date",
    width: 145,
    sorter: true,
    render: formatTableDate,
  },
  {
    title: "Asset Class",
    key: "asset_class__in",
    dataIndex: "asset_class",
    width: 125,
  },
  {
    title: "ISIN",
    key: "isin",
    dataIndex: "isin",
    width: 125,
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    dataIndex: "custodian_name",
    sorter: true,
    width: 225,
  },
  {
    title: "Account Number",
    key: "relationship-number",
    dataIndex: "relationship_number",
    width: 165,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    width: 230,
    render: (description) => <ClampedText text={description} />,
  },
  {
    title: "Currency",
    key: "currency__in",
    dataIndex: "currency",
    render: (value) => <CurrencyTag currency={value} />,
    width: 115,
  },
  {
    title: "Quantity",
    key: "quantity",
    dataIndex: "quantity",
    render: (text) => <TooltipText value={text} type="quantity" />,
    sorter: true,
    width: 125,
    align: "right",
  },
  {
    title: "Cost Price",
    key: "cost-price",
    dataIndex: "cost_price",
    render: (text) => <TooltipText value={text} type="price" />,
    sorter: true,
    width: 115,
    align: "right",
  },
  {
    title: "MTM Price",
    key: "mtm-price",
    dataIndex: "mtm_price",
    render: (text) => <TooltipText value={text} type="price" />,
    sorter: true,
    width: 135,
    align: "right",
  },
  {
    title: "Accrued Interest",
    key: "accrued-interest",
    dataIndex: "accrued_interest",
    render: (text) => <TooltipText value={text} />,
    width: 135,
    align: "right",
  },
  {
    title: "Unrealized P/L",
    key: "unrealized-pl",
    dataIndex: "unrealized_pl",
    render: (text) => <TooltipText value={text} type="price" />,
    width: 135,
    align: "right",
  },
  {
    ...ActionColumn,
    render: (id) => <Action id={id} />,
  },
];

export default function PositionStatement() {
  return <Statement urlKey={URLs.get} columns={Columns} />;
}
