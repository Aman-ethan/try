"use client";

import { formatPrice, formatQuantity, formatTableDate } from "@/lib/format";
import { ThunderboltOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import CurrencyTag from "../../General/CurrencyTag";
import MoreMenu, { DeleteItem, EditItem } from "../../General/MoreMenu";
import Statement from ".";
import PositionStatementForm from "../Form/PositionStatementForm";

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
  put: "/statement/position/{id}/",
  delete: "/statement/position/{id}/",
};

function Action({ id }: { id: string }) {
  return (
    <MoreMenu
      items={[
        {
          key: "edit",
          label: (
            <EditItem
              id={id}
              form={PositionStatementForm}
              drawerTitle="Edit Position Statement"
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
    key: "asset-class",
    dataIndex: "asset_class",
    filters: [],
    filterSearch: true,
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
    filters: [],
    filterSearch: true,
    width: 225,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    dataIndex: "relationship_number",
    width: 165,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    width: 230,
  },
  {
    title: "Currency",
    key: "currency",
    dataIndex: "currency",
    render: (value) => <CurrencyTag currency={value} />,
    width: 115,
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
    render: (value, record) => formatPrice(value, record.currency),
    width: 115,
  },
  {
    title: "MTM Price",
    key: "mtm-price",
    dataIndex: "mtm_price",
    render: (value, record) => formatPrice(value, record.currency),
    width: 135,
  },
  {
    title: "Accrued Interest",
    key: "accrued-interest",
    dataIndex: "accrued_interest",
    render: (value, record) => formatPrice(value, record.currency),
    width: 135,
  },
  {
    title: "Unrealized P/L",
    key: "unrealized-pl",
    dataIndex: "unrealized_pl",
    render: (value, record) => formatPrice(value, record.currency),
    width: 135,
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

export default function PositionStatement() {
  return <Statement urlKey={URLs.get} columns={Columns} />;
}
