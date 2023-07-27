"use client";

import Title from "@/components/Typography/Title";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IClient } from "@/interfaces/Main";
import { formatCompactNumber } from "@/lib/format";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps, TableColumnsType } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import ScrollableTable from "../Table/ScrollableTable";

interface ISettingProps {
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
}

function useClientNetWorth() {
  const { isLoading } = useTransactionServerQuery<IClient[]>(`/client/`);

  return {
    isLoading,
    data: [
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
    ] as IClient[],
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
      disabled
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
    <div className="flex-1 max-w-[30rem] h-[28.5rem] space-y-6 rounded-lg bg-white p-6 lap:w-2/5">
      <div className="flex items-center justify-between">
        <Title level={4}>Net Worth</Title>
        <Title level={3}>
          {formatCompactNumber(
            data?.reduce((acc, cur) => acc + cur.net_worth, 0)
          )}
        </Title>
      </div>
      <ScrollableTable
        loading={isLoading}
        columns={Columns}
        dataSource={data}
        rowKey="id"
        className="table-reset whitespace-nowrap"
        rowClassName="h-12"
        scroll={{ y: "18rem" }}
      />
    </div>
  );
}
