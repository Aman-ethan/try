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
          <div
            style={{
              height: `calc(${props.scroll?.y} - 2.5rem)`,
            }}
            className="flex items-center justify-center"
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
