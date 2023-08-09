"use client";

import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps, TableColumnsType } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Title from "@/components/Typography/Title";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IClient } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
import ScrollableTable from "../Table/ScrollableTable";

interface ISettingProps {
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
}

function useClientNetWorth() {
  const { isLoading, data } = useTransactionServerQuery<{
    overview: IClient[];
  }>(`/position/history/networth_overview/`);

  return {
    isLoading,
    data,
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
    dataIndex: "daily_change",
    key: "daily-pl",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "Total P/L",
    dataIndex: "total_change",
    key: "total-pl",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "Net Worth",
    dataIndex: "networth",
    key: "net-worth",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "MTD",
    dataIndex: "month_change",
    key: "mtd",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "QTD",
    dataIndex: "quarter_change",
    key: "qtd",
    align: "right",
    render: formatCompactNumber,
  },
  {
    title: "YTD",
    dataIndex: "year_change",
    key: "ytd",
    align: "right",
    render: formatCompactNumber,
  },
];

function Setting({ selectedColumns, setSelectedColumns }: ISettingProps) {
  // @ts-expect-error
  const items: MenuProps["items"] = columns.map((column) => {
    const isChecked = selectedColumns.includes(column.key as string);
    return {
      label: <Checkbox checked={isChecked}>{column.title as string}</Checkbox>,
      key: column.key,
    };
  });
  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items,
        onClick: ({ key }) => {
          if (selectedColumns.includes(key)) {
            setSelectedColumns((prevSelected) =>
              prevSelected.filter((columnKey: string) => key !== columnKey)
            );
          } else {
            setSelectedColumns((prevSelected) => [...prevSelected, key]);
          }
        },
      }}
      placement="bottomRight"
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
  const { isLoading, data } = useClientNetWorth();
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    defaultSelectedColumns
  );

  const filteredColumns: TableColumnsType<IClient> = columns
    .filter((column) => selectedColumns.includes(column.key as string))
    .map((column, index) =>
      index === 0
        ? {
            ...column,
            align: "left",
            width: 100,
          }
        : { ...column, width: 97 }
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
      align: "right",
      key: "setting",
      fixed: "right",
      width: 40,
    },
  ];
  return (
    <div className="space-y-4 tab:space-y-6">
      <div className="flex items-center justify-between">
        <Title level={4}>Net Worth</Title>
        <Title level={3}>
          {formatCompactNumber(
            data?.overview.reduce((acc, cur) => acc + cur.networth, 0)
          )}
        </Title>
      </div>
      <ScrollableTable
        loading={isLoading}
        columns={Columns}
        dataSource={data?.overview}
        rowKey="client_id"
        className="table-reset h-[22rem] overflow-y-auto"
        scroll={{ y: "16rem" }}
        pagination={{ pageSize: data?.overview.length }}
      />
    </div>
  );
}
