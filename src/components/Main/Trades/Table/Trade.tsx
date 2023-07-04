import { TableProps } from "antd";
import ScrollableTable from "../../Table/ScrollableTable";

export default function Trade({ columns }: Pick<TableProps<any>, "columns">) {
  return (
    <ScrollableTable
      columns={columns}
      scroll={{ y: "h-[calc(100vh-28rem)]" }}
    />
  );
}
