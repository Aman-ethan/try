"use client";

import { ColumnsType } from "antd/es/table";
import Statement from "./Statement";

const Columns: ColumnsType = [
  {
    title: "Client Name",
    key: "client-name",
    width: 115,
  },
  {
    title: "Custodian Name",
    key: "custodian-name",
    width: 225,
  },
  {
    title: "Statement Date",
    key: "statement-date",
    width: 145,
  },
  {
    title: "Upload Date",
    key: "upload-date",
    width: 145,
  },
  {
    title: "Status",
    key: "status",
    width: 145,
  },
  {
    title: "Reporting Currency",
    key: "reporting-currency",
    width: 160,
  },
  {
    title: "Relationship Number",
    key: "relationship-number",
    width: 170,
  },
];

export default function BankStatement() {
  return <Statement columns={Columns} />;
}
