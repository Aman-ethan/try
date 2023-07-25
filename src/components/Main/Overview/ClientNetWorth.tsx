"use client";

import Title from "@/components/Typography/Title";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import Table from "../Table";

interface IClient {
  client_id: number;
  client_name: string;
  net_worth: number;
  total_pl: number;
  daily_pl: number;
}

interface ISettingProps {
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
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

const columns: TableColumnsType<IClient> = [
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
    title: "MTD",
    dataIndex: "mtd",
    key: "mtd",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "QTD",
    dataIndex: "qtd",
    key: "qtd",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "YTD",
    dataIndex: "ytd",
    key: "ytd",
    align: "right",
    render: formatCompactNumber,
  },
];

function Setting({ selectedColumns, setSelectedColumns }: ISettingProps) {
  const items: MenuProps["items"] = columns.map((column) => {
    const isChecked = selectedColumns.includes(column.key as string);
    const onCheckboxClick = () => {
      if (isChecked) {
        setSelectedColumns(
          selectedColumns.filter((key: string) => key !== column.key)
        );
      } else {
        setSelectedColumns((prev) => [...prev, column.key as string]);
      }
    };
    return {
      label: (
        <Checkbox checked={isChecked} onClick={onCheckboxClick}>
          {column.title as string}
        </Checkbox>
      ),
      key: column.key,
      type: "group",
    };
  });
  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <Button type="text" icon={<SettingOutlined />} />
    </Dropdown>
  );
}

const defaultSelectedColumns = [
  "client-name",
  "daily-pl",
  "total-pl",
  "net-worth",
];

export default function ClientNetWorth() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    defaultSelectedColumns
  );
  const { isLoading, data } = useClientNetWorth();
  const filteredColumns: TableColumnsType<IClient> = columns
    .filter((column) => selectedColumns.includes(column.key as string))
    .map((column, index) =>
      index === 0
        ? {
            ...column,
            align: "left",
          }
        : column
    );
  const Columns: TableColumnsType<IClient> = [
    ...filteredColumns,
    {
      title: (
        <Setting
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      ),
      key: "setting",
      fixed: "right",
      width: 40,
    },
  ];
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
        columns={Columns}
        dataSource={data}
        rowKey="id"
        className="h-[24rem] table-reset"
        scroll={{ y: "21rem" }}
      />
    </div>
  );
}
