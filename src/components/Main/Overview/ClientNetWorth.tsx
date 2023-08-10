"use client";

import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps, TableColumnsType } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { useResizeObserver } from "@mantine/hooks";
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
      <Button
        shape="circle"
        type="text"
        size="small"
        className="translate-x-1.5 translate-y-3"
        icon={<SettingOutlined className="text-xl text-neutral-10" />}
      />
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
  const [containerRef, containerRect] = useResizeObserver();

  const filteredColumns: TableColumnsType<IClient> = columns
    .filter((column) => selectedColumns.includes(column.key as string))
    .map((column, index) =>
      index === 0
        ? {
            ...column,
            align: "left",
            width: 109,
          }
        : { ...column, width: 102 }
    );

  return (
    <div className="space-y-4 tab:space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <Title level={4}>Net Worth</Title>
        <Title level={3}>
          {formatCompactNumber(
            data?.overview.reduce((acc, cur) => acc + cur.networth, 0)
          )}
        </Title>
      </div>
      <div ref={containerRef} className="flex flex-1 min-h-[20.5rem]">
        <ScrollableTable
          sticky
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.overview}
          rowKey="client_id"
          className="table-reset overflow-y-auto"
          style={{ height: containerRect?.height }}
          scroll={{ y: containerRect.height }}
          pagination={{ pageSize: data?.overview.length }}
        />
        <Setting
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      </div>
    </div>
  );
}
