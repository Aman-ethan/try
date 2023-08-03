import { Table as AntdTable, Empty, TableProps } from "antd";

export default function Table({
  pagination,
  size = "middle",
  scroll,
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
              height: `calc(${scroll?.y} - 1rem)`,
            }}
            className="flex items-center justify-center"
          >
            {props.loading ? null : <Empty />}
          </div>
        ),
      }}
      scroll={{
        x: scroll?.x,
      }}
      size={size}
      {...props}
    />
  );
}
