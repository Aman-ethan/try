"use client";

import Title from "@/components/Typography/Title";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import { SettingOutlined } from "@ant-design/icons";
import { Button, TableColumnsType } from "antd";
import dayjs from "dayjs";
import Table from "../Table";

interface IClient {
  client_id: number;
  client_name: string;
  net_worth: number;
  total_pl: number;
  daily_pl: number;
}

function useClientNetWorth() {
  const { data, isLoading } = useTransactionServerQuery<IClient[]>(
    `/position_history/summary/daily/${buildURLSearchParams({
      report_date: dayjs().format(DATE_PARAM_FORMAT),
    })}`
  );

  return {
    isLoading,
    data:
      data ||
      ([
        {
          client_name: "TT_SS",
          daily_pl: 1000,
          total_pl: 1000,
          net_worth: 1000,
        },
        {
          client_name: "AK_NK",
          daily_pl: 10000,
          total_pl: 10000,
          net_worth: 10000,
        },
      ] as IClient[]),
  };
}

const columns: TableColumnsType = [
  {
    title: "Client Name",
    dataIndex: "client_name",
    key: "client-name",
    align: "left",
  },
  {
    title: "Daily P/L",
    dataIndex: "daily_pl",
    key: "daily-pl",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "Total P/L",
    dataIndex: "total_pl",
    key: "total-pl",
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
  {
    title: (
      <Button
        icon={<SettingOutlined className="text-neutral-10" />}
        type="text"
      />
    ),
    key: "setting",
    fixed: "right",
    width: 40,
  },
];

export default function ClientNetWorth() {
  const { isLoading, data } = useClientNetWorth();
  return (
    <div className="flex-1 lap:w-2/5 space-y-6 rounded-lg bg-white p-6">
      <div className="flex items-center justify-between">
        <Title level={4}>Net Worth</Title>
        <Title level={3}>
          {formatCompactNumber(
            data?.reduce((acc, cur) => acc + cur.net_worth, 0)
          )}
        </Title>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        className="h-[24rem] table-reset"
        scroll={{ y: "21rem" }}
      />
    </div>
  );
}
