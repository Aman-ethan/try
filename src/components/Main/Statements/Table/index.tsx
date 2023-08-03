import { TableProps } from "antd";
import useStatement from "@/hooks/useStatement";
import { useTableFilter } from "@/hooks/useTable";
import ScrollableTable from "../../Table/ScrollableTable";

export default function Statement<T>({
  urlKey,
  columns,
}: Pick<TableProps<T>, "columns"> & { urlKey: string }) {
  const { addFilters } = useTableFilter();
  const { data, isLoading, onChange, pagination } = useStatement<T>({ urlKey });

  return (
    <ScrollableTable
      rowClassName="h-20"
      className="min-h-[calc(100vh-20rem)]"
      scroll={{ y: "calc(100vh - 25rem)" }}
      dataSource={data?.results}
      loading={isLoading}
      columns={columns?.map(addFilters)}
      rowKey="id"
      onChange={onChange}
      pagination={{ ...pagination, total: data?.count }}
    />
  );
}
