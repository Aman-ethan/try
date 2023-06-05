"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Card, TableColumnsType } from "antd";
import Table, { useSelectRow } from "../Common/Table";
import { useState } from "react";
import Currency from "../Common/Currency";
import { preload } from "swr";
import { getFetcher } from "@/lib/fetcher";

interface IDailySummaryResponse {
  data: {
    client_id: number;
    client_name: string;
    net_worth: number;
    total_pl: number;
  }[];
}

preload("/company/", getFetcher);

function useNetWorth() {
  const { getSearchParams } = useSearchParams();
  const selectedDate = getSearchParams("selected_date");
  const { data, isLoading } = useTransactionServerQuery<IDailySummaryResponse>(
    selectedDate
      ? `/position_history/summary/daily/` +
          buildURLSearchParams({
            report_date: selectedDate,
          })
      : null
  );

  return {
    isLoading: isLoading,
    data: data?.data,
  };
}

const columns: TableColumnsType = [
  {
    title: "Client Name",
    dataIndex: "client_name",
  },
  {
    title: "Total PL",
    dataIndex: "total_pl",
    render(value) {
      return <Currency amount={value} />;
    },
  },
  {
    title: "Net Worth",
    dataIndex: "net_worth",
    render(value) {
      return <Currency amount={value} />;
    },
  },
];

export default function NetWorth() {
  const { isLoading, data } = useNetWorth();
  const { onRow, rowSelection } = useSelectRow({
    key: "client_id",
    defaultValue: data?.[0]?.client_id,
  });
  return (
    <Card bordered={false} title="Net Worth" className="rounded-r-none">
      <Table
        size="middle"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.client_id}
        onRow={onRow}
        rowSelection={rowSelection}
      />
    </Card>
  );
}
