"use client";

import { TableColumnsType } from "antd";
import { formatTableDate } from "@/lib/format";
import { ThunderboltOutlined } from "@ant-design/icons";
import Statement from "./Statement";
import StatusTag from "../../General/StatusTag";
import CurrencyTag from "../../General/CurrencyTag";
import MoreMenu, { DeleteItem, DownloadItem } from "../../General/MoreMenu";

interface IBankStatement {
  id: string;
  client_name: string;
  custodian_name: string;
  statement_date: string;
  upload_date: string;
  status: string;
  reporting_currency: string;
  relationship_number: string;
  portfolio_number: string;
  s3_url: string;
}

interface IActionProps {
  id: string;
  downloadUrl: string;
}

const URLs = {
  get: "/statement/bank/",
  delete: "/statement/bank/{id}/",
};

function Action({ id, downloadUrl }: IActionProps) {
  return (
    <MoreMenu
      items={[
        {
          key: "download",
          label: <DownloadItem url={downloadUrl} />,
        },
        {
          key: "delete",
          label: <DeleteItem id={id} urls={URLs} />,
        },
      ]}
    />
  );
}

const Columns: TableColumnsType<IBankStatement> = [
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
    sorter: true,
  },
  {
    title: "Upload Date",
    key: "upload-date",
    width: 145,
    dataIndex: "upload_date",
    render: formatTableDate,
    sorter: true,
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
    dataIndex: "relationship_number",
    width: 170,
  },
  {
    title: "Portfoilio Number",
    key: "portfolio-number",
    dataIndex: "portfolio_number",
    width: 170,
  },
  {
    fixed: "right",
    title: <ThunderboltOutlined />,
    key: "actions",
    width: 55,
    dataIndex: "id",
    align: "center",
    render: (id, { s3_url }) => <Action id={id} downloadUrl={s3_url} />,
  },
];

export default function BankStatement() {
  return <Statement urlKey={URLs.get} columns={Columns} />;
}
