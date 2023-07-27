import { useTransactionServerQuery } from "@/hooks/useQuery";
import useTable, { useTableFilter } from "@/hooks/useTable";
import { IPaginatedResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { TableProps } from "antd";
import ScrollableTable from "../../Table/ScrollableTable";

const searchParamsKey = [
  "asset_class__in",
  "currency__in",
  "custodian__in",
  "reporting_currency__in",
  "statement_date__gte",
  "statement_date__lte",
  "statement_type__in",
  "transaction_type__in",
  "trade_action__in",
];

export default function Statement<T>({
  urlKey,
  columns,
}: Pick<TableProps<T>, "columns"> & { urlKey: string }) {
  const {
    getSearchParams,
    onChange,
    pagination,
    page,
    ordering,
    client,
    custodian,
  } = useTable();
  const { addFilters } = useTableFilter();

  const { data, isLoading } = useTransactionServerQuery<IPaginatedResponse<T>>(
    urlKey +
      buildURLSearchParams({
        client,
        custodian,
        page,
        ordering,
        ...searchParamsKey.reduce(
          (acc, key) => ({
            ...acc,
            [key]: getSearchParams(key as SearchParams),
          }),
          {}
        ),
      })
  );

  return (
    <ScrollableTable
      scroll={{ y: "calc(100vh - 23rem)" }}
      style={{
        height: "calc(100vh - 20rem)",
      }}
      dataSource={data?.results}
      loading={isLoading}
      columns={columns?.map(addFilters)}
      rowKey="id"
      onChange={onChange}
      pagination={{ ...pagination, total: data?.count }}
    />
  );
}
