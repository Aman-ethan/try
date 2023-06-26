import { TableProps } from "antd";
import ScrollableTable from "../../Table/ScrollableTable";

export default function Trade({
  columns,
  action,
}: Pick<TableProps<any>, "columns"> & { action?: boolean }) {
  return (
    <ScrollableTable
      columns={columns}
      scroll={{ y: "h-[calc(100vh-28rem)]" }}
      action={action}
    />
  );
}
