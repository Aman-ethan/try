import { Button, TableColumnsType } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useTable, { useSelectRow, useTableFilter } from "@/hooks/useTable";
import { IPaginatedResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { BlotterSearchParamKeys } from "@/constants/searchParams";
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

  const { data, isLoading } = useTransactionServerQuery<IPaginatedResponse<T>>(
    urlKey +
      buildURLSearchParams({
        client,
        custodian,
        ordering,
        page,
        ...BlotterSearchParamKeys.reduce(
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

  const handleClose = () => {
    setSelectedRowKey(undefined);
  };

  return (
    <>
      <ViewDrawer<T>
        open={!!selectedRowKey}
        onClose={handleClose}
        title={edit ? "Trade View" : "Active Position View"}
        columns={columns}
        urlKey={`${urlKey + selectedRowKey}/`}
        footer={
          edit ? (
            <EditTradeDrawer
              key={selectedRowKey}
              id={selectedRowKey}
              onClose={handleClose}
              button={
                <Button type="primary" size="large">
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
        className="h-[36rem]"
        scroll={{ y: "30rem" }}
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
