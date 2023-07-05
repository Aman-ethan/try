import { Table as AntdTable, Empty, TableProps } from "antd";
import { RowSelectionType } from "antd/es/table/interface";
import { useLayoutEffect, useState } from "react";

interface IUseSelectRow<T> {
  key: keyof T;
  defaultValue?: string | number;
  onRowClick?: (_record: T) => void;
}

type Key = string | number | null;

export function useSelectRow<T>({
  key,
  defaultValue,
  onRowClick,
}: IUseSelectRow<T>) {
  const [selectedRowKey, setSelectedRowKey] = useState<Key>(null);

  useLayoutEffect(() => {
    if (defaultValue) setSelectedRowKey(defaultValue);
  }, [defaultValue]);

  const rowSelection = {
    renderCell: () => null,
    selectedRowKeys: selectedRowKey ? [selectedRowKey] : undefined,
    type: "radio" as RowSelectionType,
    columnWidth: 0,
  };

  function onRow(record: T) {
    return {
      onClick() {
        setSelectedRowKey(record[key] as Key);
        onRowClick?.(record);
      },
    };
  }

  return {
    rowSelection,
    onRow,
  };
}

export default function Table({
  pagination,
  size = "middle",
  ...props
}: TableProps<any>) {
  return (
    <AntdTable
      pagination={{
        hideOnSinglePage: true,
        showSizeChanger: false,
        ...pagination,
      }}
      locale={{
        emptyText: (
          <div
            style={{
              height: props.scroll?.y,
            }}
            className="flex justify-center items-center"
          >
            {props.loading ? null : <Empty />}
          </div>
        ),
      }}
      size={size}
      {...props}
    />
  );
}
