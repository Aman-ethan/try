"use client";

import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps, TableColumnsType } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Title from "@/components/Typography/Title";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IClient } from "@/interfaces/Main";
import TooltipText from "@/components/Typography/ToolTipText";
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
    render: (text) => <TooltipText value={text} type="price" />,
  },
  {
    title: "Total P/L",
    dataIndex: "total_change",
    key: "total-pl",
    align: "right",
    render: (text) => <TooltipText value={text} type="price" />,
  },
  {
    title: "Net Worth",
    dataIndex: "networth",
    key: "net-worth",
    align: "right",
    render: (text) => <TooltipText value={text} type="price" />,
  },
  {
    title: "MTD",
    dataIndex: "month_change",
    key: "mtd",
    align: "right",
    render: (text) => <TooltipText value={text} type="price" />,
  },
  {
    title: "QTD",
    dataIndex: "quarter_change",
    key: "qtd",
    align: "right",
    render: (text) => <TooltipText value={text} type="price" />,
  },
  {
    title: "YTD",
    dataIndex: "year_change",
    key: "ytd",
    align: "right",
    render: (text) => <TooltipText value={text} type="price" />,
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

export default function ClientNetWorth({
  tableHeight,
}: {
  tableHeight: number;
}) {
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
            width: 109,
          }
        : { ...column, width: 102 }
    );
  const networth = data?.overview.reduce((acc, cur) => acc + cur.networth, 0);
  return (
    <div className="space-y-4 tab:space-y-6">
      <div className="flex items-center justify-between">
        <Title level={4}>Net Worth</Title>
        <Title level={3}>
          <TooltipText value={networth} type="price" />
        </Title>
      </div>
      <div className="flex">
        <ScrollableTable
          sticky
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.overview}
          rowKey="client_id"
          className="table-reset overflow-y-auto"
          style={{ height: tableHeight }}
          scroll={{ y: tableHeight }}
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
