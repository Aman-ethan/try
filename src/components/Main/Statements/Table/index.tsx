import { TableProps } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";
import { SorterResult } from "antd/es/table/interface";
import ScrollableTable from "../../Table/ScrollableTable";

interface IStatementResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export default function Statement<T>({
  urlKey,
  columns,
}: Pick<TableProps<T>, "columns"> & { urlKey: string }) {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();

  const page = getSearchParams("page");
  const client = getSearchParams("client");
  const custodian = getSearchParams("custodian");
  const ordering = getSearchParams("ordering");
  const statementDateGTE = getSearchParams("statement_date__gte");
  const statementDateLTE = getSearchParams("statement_date__lte");

  const { data, isLoading } = useTransactionServerQuery<IStatementResponse<T>>(
    urlKey +
      buildURLSearchParams({
        client,
        custodian,
        page,
        ordering,
        statement_date__gte: statementDateGTE,
        statement_date__lte: statementDateLTE,
      })
  );

  return (
    <ScrollableTable<T>
      scroll={{ y: "calc(100vh - 25rem)" }}
      className="h-[calc(100vh-20rem)]"
      dataSource={data?.results}
      loading={isLoading}
      columns={columns}
      rowKey="id"
      onChange={(pagination, _, sorter) => {
        const { field, order } = sorter as SorterResult<T>;
        let _ordering;
        if (order) {
          _ordering = order === "descend" ? `-${field}` : field?.toString();
        }
        updateSearchParams({
          page: String(pagination.current),
          ordering: _ordering,
        });
      }}
      pagination={{
        position: ["bottomRight"],
        current: Number(page) || 1,
        pageSize: 10,
        total: data?.count,
      }}
    />
  );
}