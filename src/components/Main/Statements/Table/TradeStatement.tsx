"use client";

import { TableColumnsType } from "antd";
import { formatTableDate } from "@/lib/format";
import Statement from "./Statement";
import { ThunderboltOutlined } from "@ant-design/icons";
import MoreMenu, { DeleteItem } from "../../General/MoreMenu";

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
    dataIndex: "security_id",
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
    render: () => (
      <MoreMenu
        items={[
          {
            key: "edit",
            label: <button>Edit</button>,
          },
          {
            key: "delete",
            label: <DeleteItem />,
          },
        ]}
      />
    ),
  },
];

const URLs = {
  get: "/statement/trade/",
};

export default function TradeStatement() {
  return <Statement urls={URLs} columns={Columns} />;
}
