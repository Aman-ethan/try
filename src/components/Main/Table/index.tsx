import { Table as AntdTable, Empty, TableProps } from "antd";

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
          <div className="flex items-center justify-center h-[calc(100vh-25rem)]">
            {props.loading ? null : <Empty />}
          </div>
        ),
      }}
      size={size}
      {...props}
    />
  );
}
