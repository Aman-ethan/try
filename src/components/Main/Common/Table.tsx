import { Table as AntdTable, TableProps } from "antd";
import { RowSelectionType } from "antd/es/table/interface";
import clsx from "clsx";
import { useLayoutEffect, useState } from "react";

interface IUseSelectRow<T> {
  key: keyof T;
  defaultValue?: string | number;
  onRowClick?: (record: T) => void;
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
  className,
  rowClassName,
  rootClassName,
  ...props
}: TableProps<any>) {
  return (
    <AntdTable
      pagination={{ hideOnSinglePage: true, ...pagination }}
      rootClassName={clsx("initial:h-96", rootClassName)}
      {...props}
    />
  );
}
