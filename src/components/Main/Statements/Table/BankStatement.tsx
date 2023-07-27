"use client";

import { ActionColumn } from "@/constants/table";
import { formatTableDate } from "@/lib/format";
import { TableColumnsType } from "antd";
import { capitalize } from "lodash";
import Statement from ".";
import CurrencyTag from "../../General/CurrencyTag";
import MoreMenu, { DeleteItem, DownloadItem } from "../../General/MoreMenu";
import StatusTag from "../../General/StatusTag";

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
    key: "client_name",
    width: 115,
    dataIndex: "client_name",
  },
  {
    title: "Custodian Name",
    key: "custodian_name",
    width: 225,
    dataIndex: "custodian_name",
  },
  {
    title: "Statement Date",
    key: "statement_date",
    width: 145,
    dataIndex: "statement_date",
    render: formatTableDate,
    sorter: true,
  },
  {
    title: "Upload Date",
    key: "upload_date",
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
    key: "reporting_currency__in",
    width: 175,
    dataIndex: "reporting_currency",
    render: (currency) => <CurrencyTag currency={currency} />,
  },
  {
    title: "Relationship Number",
    key: "relationship_number",
    dataIndex: "relationship_number",
    width: 170,
  },
  {
    title: "Type of Statement",
    key: "statement_type__in",
    dataIndex: "statement_type",
    render: capitalize,
    width: 170,
  },
  {
    ...ActionColumn,
    render: (id, { s3_url }) => <Action id={id} downloadUrl={s3_url} />,
  },
];

export default function BankStatement() {
  return <Statement urlKey={URLs.get} columns={Columns} />;
}
