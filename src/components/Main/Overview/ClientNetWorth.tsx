"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { TdHTMLAttributes } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { Empty, Spin } from "antd";
import { formatCompactNumber } from "@/lib/format";

interface IClient {
  client_id: number;
  client_name: string;
  net_worth: number;
  total_pl: number;
}

interface ITableColumn {
  title: string;
  dataIndex: string;
  thClassName?: string;
  tdClassName?: string;
  key: string;
  align?: TdHTMLAttributes<HTMLTableCellElement>["align"];
  render?: (_value: string | number) => string | number;
}

type TDataSource = Record<string, string | number>[] | undefined;

interface ITableProps {
  columns: ITableColumn[];
  dataSource: TDataSource;
  rowKey: string;
  className?: string;
  loading?: boolean;
}

const containerClassName = "flex items-center justify-center";

function Table({
  columns,
  className,
  dataSource,
  loading,
  rowKey,
}: ITableProps) {
  if (loading) {
    <div className={clsx(containerClassName, className)}>
      <Spin />
    </div>;
  }
  if (!dataSource?.length) {
    return (
      <div className={clsx(containerClassName, className)}>
        <Empty />
      </div>
    );
  }
  const TableHeaders = columns.map(({ align, key, title, thClassName }) => (
    <th
      key={key}
      align={align}
      className={clsx("initial:font-normal", thClassName)}
    >
      {title}
    </th>
  ));
  return (
    <div className="-space-y-6 bg-white">
      <table className="w-full relative ">
        <thead className="text-neutral-10">
          <tr className="h-14">{TableHeaders}</tr>
        </thead>
      </table>
      <div className={clsx("overflow-y-scroll", className)}>
        <table className="w-full">
          <thead className="invisible">
            <tr>{TableHeaders}</tr>
          </thead>
          <tbody className="text-neutral-13/80">
            {dataSource?.map((row) => (
              <tr key={row[rowKey]} className="h-14 border-b">
                {columns.map(
                  ({
                    dataIndex,
                    align,
                    key,
                    render = (value) => value,
                    tdClassName,
                  }) => (
                    <td key={key} align={align} className={tdClassName}>
                      {render(row[dataIndex])}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function useClientNetWorth() {
  const { isLoading } = useTransactionServerQuery<IClient[]>(
    `/position_history/summary/daily/${buildURLSearchParams({
      report_date: dayjs().format(DATE_PARAM_FORMAT),
    })}`
  );

  return {
    isLoading,
    data: [
      { id: "1", client_name: "TT_SS", total_pl: 10000, net_worth: 10000 },
    ],
  };
}

const columns: ITableColumn[] = [
  {
    title: "Client Name",
    dataIndex: "client_name",
    key: "client-name",
    thClassName: "w-1/4",
    align: "left",
  },
  {
    title: "Total PL",
    dataIndex: "total_pl",
    key: "total-pl",
    thClassName: "w-1/3",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "Net Worth",
    dataIndex: "net_worth",
    key: "net-worth",
    align: "right",
    render: formatCompactNumber,
  },
];

export default function ClientNetWorth() {
  const { isLoading, data } = useClientNetWorth();
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data as TDataSource}
      rowKey="id"
      className="h-[24rem]"
    />
  );
}
