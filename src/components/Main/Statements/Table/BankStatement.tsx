"use client";

import { MenuProps, TableColumnsType } from "antd";
import { formatTableDate } from "@/lib/format";
import { ThunderboltOutlined } from "@ant-design/icons";
import Statement from "./Statement";
import StatusTag from "../../General/StatusTag";
import CurrencyTag from "../../General/CurrencyTag";
import MoreMenu, { DeleteItem, DownloadItem } from "../../General/MoreMenu";

const Columns: TableColumnsType = [
  {
    title: "Client Name",
    key: "client-name",
    width: 115,
    dataIndex: "client_name",
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    width: 225,
    dataIndex: "custodian_name",
  },
  {
    title: "Statement Date",
    key: "statement-date",
    width: 145,
    dataIndex: "statement_date",
    render: formatTableDate,
  },
  {
    title: "Upload Date",
    key: "upload-date",
    width: 145,
    dataIndex: "upload_date",
    render: formatTableDate,
  },
  {
    title: "Status",
    key: "status",
    width: 145,
    dataIndex: "status",
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: "Reporting Currency",
    key: "reporting-currency",
    width: 160,
    dataIndex: "reporting_currency",
    render: (currency) => <CurrencyTag currency={currency} />,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    width: 170,
    dataIndex: "relationship_number_string",
  },
  {
    fixed: "right",
    title: <ThunderboltOutlined />,
    key: "actions",
    width: 55,
    dataIndex: "id",
    align: "center",
    render: (id) => (
      <MoreMenu
        items={[
          {
            key: "download",
            label: <DownloadItem url={`/statement/bank/${id}/download/`} />,
          },
          {
            key: "delete",
            label: <DeleteItem url={`/statement/bank/${id}/`} />,
          },
        ]}
      />
    ),
  },
];

const URLs = {
  get: "/statement/bank/",
};

export default function BankStatement() {
  return <Statement urls={URLs} columns={Columns} />;
}
