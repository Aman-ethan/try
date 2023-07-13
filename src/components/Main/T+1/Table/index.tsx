import { useTransactionServerQuery } from "@/hooks/useQuery";
import useTable from "@/hooks/useTable";
import { IPaginatedResponse } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { TableProps } from "antd";
import ScrollableTable from "../../Table/ScrollableTable";

export default function TradeTable<T>({
  columns,
  urlKey,
}: Pick<TableProps<T>, "columns"> & { urlKey: string }) {
  const {
    client,
    custodian,
    onChange,
    ordering,
    page,
    pagination,
    getSearchParams,
  } = useTable();
  const asset_class = getSearchParams("asset_class");
  const security = getSearchParams("security");
  const { data, isLoading } = useTransactionServerQuery<IPaginatedResponse<T>>(
    urlKey +
      buildURLSearchParams({
        client,
        custodian,
        ordering,
        page,
        asset_class,
        security,
      })
  );
  return (
    <ScrollableTable
      rowKey="id"
      columns={columns}
      className="h-[calc(100vh-22rem)]"
      scroll={{ y: "calc(100vh - 25rem)" }}
      dataSource={data?.results}
      loading={isLoading}
      onChange={onChange}
      pagination={{ ...pagination, total: data?.count }}
    />
  );
}
