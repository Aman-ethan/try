import { Button, TableColumnsType } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useTable, { useSelectRow, useTableFilter } from "@/hooks/useTable";
import { IPaginatedResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import ViewDrawer from "../../General/ViewDrawer";
import ScrollableTable from "../../Table/ScrollableTable";
import EditTradeDrawer from "../General/EditTradeDrawer";

interface ITradeTableProps<T> {
  columns: TableColumnsType<T>;
  urlKey: string;
  edit?: boolean;
}

const searchParamKeys = [
  "asset_class__in",
  "security__in",
  "trade_action__in",
  "statement_date__gte",
  "statement_date__lte",
  "page_size",
];

export default function TradeTable<T>({
  columns,
  urlKey,
  edit = true,
}: ITradeTableProps<T>) {
  const {
    client,
    custodian,
    onChange,
    ordering,
    page,
    pagination,
    getSearchParams,
  } = useTable();
  const { addFilters } = useTableFilter();

  const { data, isLoading } = useTransactionServerQuery<IPaginatedResponse<T>>(
    urlKey +
      buildURLSearchParams({
        client,
        custodian,
        ordering,
        page,
        ...searchParamKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: getSearchParams(key as SearchParams),
          }),
          {}
        ),
      })
  );
  const { onRow, rowSelection, selectedRowKey, setSelectedRowKey } =
    useSelectRow<T>({
      key: "id" as keyof T,
    });

  return (
    <>
      <ViewDrawer<T>
        open={!!selectedRowKey}
        onClose={() => setSelectedRowKey(undefined)}
        title={edit ? "Trade View" : "Active Position View"}
        columns={columns}
        urlKey={`${urlKey + selectedRowKey}/`}
        footer={
          edit ? (
            <EditTradeDrawer
              id={selectedRowKey}
              button={
                <Button type="primary" size="large" className="px-7">
                  Edit Trade
                </Button>
              }
            />
          ) : null
        }
      />
      <ScrollableTable
        rowKey="id"
        columns={columns.map(addFilters)}
        rowClassName="h-20"
        className="min-h-[calc(100vh-22rem)]"
        scroll={{ y: "calc(100vh - 27rem)" }}
        rowSelection={rowSelection}
        onRow={onRow}
        dataSource={data?.results}
        loading={isLoading}
        onChange={onChange}
        pagination={{ ...pagination, total: data?.count }}
      />
    </>
  );
}
