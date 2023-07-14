import { useTransactionServerQuery } from "@/hooks/useQuery";
import useTable from "@/hooks/useTable";
import { IPaginatedResponse } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { TableProps } from "antd";
import ScrollableTable from "../../Table/ScrollableTable";

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

  const statementDateGTE = getSearchParams("statement_date__gte");
  const statementDateLTE = getSearchParams("statement_date__lte");

  const { data, isLoading } = useTransactionServerQuery<IPaginatedResponse<T>>(
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
    <ScrollableTable
      scroll={{ y: "calc(100vh - 25rem)" }}
      style={{
        height: "calc(100vh - 20rem)",
      }}
      dataSource={data?.results}
      loading={isLoading}
      columns={columns}
      rowKey="id"
      onChange={onChange}
      pagination={{ ...pagination, total: data?.count }}
    />
  );
}
