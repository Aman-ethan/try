import { Table as AntdTable, Empty, TableProps } from "antd";
import clsx from "clsx";

export default function Table({
  className,
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
              height: scroll?.y,
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
      className={clsx("scrollbar-hidden", className)}
      {...props}
    />
  );
}
