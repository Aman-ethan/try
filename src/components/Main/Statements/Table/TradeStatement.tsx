"use client";

import { TableColumnsType } from "antd";
import { formatTableDate } from "@/lib/format";
import { ThunderboltOutlined } from "@ant-design/icons";
import Statement from ".";
import MoreMenu, { DeleteItem, EditItem } from "../../General/MoreMenu";
import TradeStatementForm from "../Form/TradeStatementForm";

interface IActionProps {
  id: string;
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

const Columns: TableColumnsType = [
  {
    title: "Client",
    key: "client",
    dataIndex: "client_name",
    width: 105,
  },
  {
    title: "Custodian",
    key: "custodian",
    dataIndex: "custodian",
    width: 165,
    filtered: true,
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
