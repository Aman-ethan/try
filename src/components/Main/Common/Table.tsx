import { Table as AntdTable, TableProps } from "antd";
import { RowSelectionType } from "antd/es/table/interface";
import clsx from "clsx";
import { useLayoutEffect, useState } from "react";

interface IUseSelectRow {
  key: string;
  defaultValue?: string | number;
}

export function useSelectRow({ key, defaultValue }: IUseSelectRow) {
  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(
    null
  );

  useLayoutEffect(() => {
    if (defaultValue) setSelectedRowKey(defaultValue);
  }, [defaultValue]);

  const rowSelection = {
    renderCell: () => null,
    selectedRowKeys: selectedRowKey ? [selectedRowKey] : undefined,
    type: "radio" as RowSelectionType,
    columnWidth: 0,
  };

  function onRow(record: Record<string, string | number>) {
    return {
      onClick() {
        setSelectedRowKey(record[key]);
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
