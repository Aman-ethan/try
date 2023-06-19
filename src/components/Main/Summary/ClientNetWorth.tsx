"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Card, TableColumnsType } from "antd";
import Table, { useSelectRow } from "../Common/Table";
import { ClientCurrency } from "../Common/Currency";

interface IClientNetWorthResponse {
  data: {
    client_id: number;
    client_name: string;
    net_worth: number;
    total_pl: number;
  }[];
}

type IClientNetWorthRow = IClientNetWorthResponse["data"][0];

function useClientNetWorth() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const selectedDate = getSearchParams("selected_date");
  const { data, isLoading } =
    useTransactionServerQuery<IClientNetWorthResponse>(
      selectedDate
        ? `/position_history/summary/daily/` +
            buildURLSearchParams({
              report_date: selectedDate,
            })
        : null,
      {
        onSuccess(data) {
          const selectedClient = data.data[0];
          updateSearchParams({
            client_id: selectedClient?.client_id,
            client_name: selectedClient?.client_name,
          });
        },
      }
    );

  return {
    isLoading: isLoading,
    data: data?.data,
  };
}

const columns: TableColumnsType<IClientNetWorthRow> = [
  {
    title: "Client Name",
    dataIndex: "client_name",
    width: "10%",
  },
  {
    title: "Total PL",
    dataIndex: "total_pl",
    width: "45%",
    render(value, record) {
      return <ClientCurrency amount={value} clientId={record.client_id} />;
    },
  },
  {
    title: "Net Worth",
    dataIndex: "net_worth",
    width: "45%",
    render(value, record) {
      return <ClientCurrency amount={value} clientId={record.client_id} />;
    },
  },
];

export default function ClientNetWorth() {
  const { updateSearchParams } = useSearchParams();
  const { isLoading, data } = useClientNetWorth();
  const { onRow, rowSelection } = useSelectRow<IClientNetWorthRow>({
    key: "client_id",
    defaultValue: data?.[0]?.client_id,
    onRowClick(record) {
      updateSearchParams({
        client_id: record.client_id,
        client_name: record.client_name,
      });
    },
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
        rootClassName="min-h-[26rem]"
      />
    </Card>
  );
}
