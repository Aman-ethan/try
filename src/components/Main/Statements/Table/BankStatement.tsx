"use client";

import { TableColumnsType } from "antd";
import { formatTableDate } from "@/lib/format";
import Statement from "./Statement";
import StatusTag from "../../General/StatusTag";
import CurrencyTag from "../../General/CurrencyTag";

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
    dataIndex: "relationship_number",
  },
];

const URLs = {
  get: "/statement/bank/",
};

export default function BankStatement() {
  return <Statement urls={URLs} columns={Columns} />;
}
