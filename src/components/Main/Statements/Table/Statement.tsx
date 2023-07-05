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

interface IURLs {
  get: string;
  delete?: string;
}

export default function Statement<T>({
  urls,
  columns,
}: Pick<TableProps<T>, "columns"> & { urls: IURLs }) {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();

  const pageSize = getSearchParams("page_size");
  const clientId = getSearchParams("client");
  const custodianId = getSearchParams("custodian");
  const statementDateGTE = getSearchParams("statement_date__gte");
  const statementDateLTE = getSearchParams("statement_date__lte");

  const { data, isLoading } = useTransactionServerQuery<IStatementResponse<T>>(
    urls.get +
      buildURLSearchParams({
        client: clientId,
        custodian: custodianId,
        page_size: pageSize,
        statement_date__gte: statementDateGTE,
        statement_date__lte: statementDateLTE,
      })
  );

  return (
    <ScrollableTable<T>
      scroll={{ y: "calc(100vh - 25rem)" }}
      style={{ height: "calc(100vh - 20rem)" }}
      dataSource={data?.results}
      loading={isLoading}
      columns={columns}
      rowKey="id"
      pagination={{
        position: ["bottomRight"],
        current: Number(pageSize) || 1,
        pageSize: 10,
        total: data?.count,
        onChange(page) {
          updateSearchParams({ page_size: String(page) });
        },
      }}
    />
  );
}
