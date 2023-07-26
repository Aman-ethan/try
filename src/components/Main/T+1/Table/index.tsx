import { useTransactionServerQuery } from "@/hooks/useQuery";
import useTable, { useSelectRow, useTableFilter } from "@/hooks/useTable";
import { IPaginatedResponse } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Button, TableColumnsType } from "antd";
import ViewDrawer from "../../General/ViewDrawer";
import ScrollableTable from "../../Table/ScrollableTable";
import EditTradeDrawer from "../General/EditTradeDrawer";

interface ITradeTableProps<T> {
  columns: TableColumnsType<T>;
  urlKey: string;
  edit?: boolean;
}

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
  const { onRow, rowSelection, selectedRowKey, setSelectedRowKey } =
    useSelectRow<T>({
      key: "id" as keyof T,
    });

  return (
    <>
      <ViewDrawer<T>
        open={!!selectedRowKey}
        onClose={() => setSelectedRowKey(undefined)}
        title="Trade View"
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
        className="h-[calc(100vh-22rem)]"
        scroll={{ y: "calc(100vh - 25rem)" }}
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
