import { TableProps } from "antd";
import ScrollableTable from "../../Table/ScrollableTable";

export default function TradeTable({
  columns,
}: Pick<TableProps<any>, "columns">) {
  return (
    <ScrollableTable
      columns={columns}
      className="h-[calc(100vh-22rem)]"
      scroll={{ y: "calc(100vh - 25rem)" }}
    />
  );
}
