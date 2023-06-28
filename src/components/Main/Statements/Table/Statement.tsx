import { TableProps } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";
import ScrollableTable from "../../Table/ScrollableTable";

interface IStatementResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export default function Statement<T extends { id: string }>({
  urlKey,
  columns,
}: Pick<TableProps<unknown>, "columns"> & { urlKey: string }) {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();

  const page_size = getSearchParams("page_size");
  const client_id = getSearchParams("client_id");
  const custodian_id = getSearchParams("custodian_id");

  const { data, isLoading } = useTransactionServerQuery<IStatementResponse<T>>(
    `${urlKey}${buildURLSearchParams({ page_size, client_id, custodian_id })}`
  );

  return (
    <ScrollableTable
      scroll={{ y: "calc(100vh - 25rem)" }}
      style={{ height: "calc(100vh - 20rem)" }}
      dataSource={data?.results}
      loading={isLoading}
      columns={columns}
      rowKey="id"
      pagination={{
        position: ["bottomRight"],
        current: Number(page_size) || 1,
        pageSize: 10,
        total: data?.count,
        onChange(page) {
          updateSearchParams({ page_size: String(page) });
        },
      }}
    />
  );
}
