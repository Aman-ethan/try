import { StatementOptions, TradeActionOptions } from "@/constants/options";
import { IAssetClass, ICurrency, ICustodian } from "@/interfaces/Main";
import {
  FilterValue,
  RowSelectionType,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { useLayoutEffect, useState } from "react";
import { useTransactionServerQuery } from "./useQuery";
import useSearchParams from "./useSearchParams";

interface ISelectRow<T> {
  key: keyof T;
  defaultValue?: string;
  onRowClick?: (_record: T) => void;
}

export default function useTable() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const client = getSearchParams("client");
  const custodian = getSearchParams("custodian");
  const page = getSearchParams("page");
  const ordering = getSearchParams("ordering");

  function onChange<T>(
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) {
    const { field, order } = sorter as SorterResult<T>;
    const _ordering = order === "descend" ? `-${field}` : field?.toString();
    updateSearchParams({
      page: String(pagination.current),
      ordering: order ? _ordering : undefined,
    });
  }

  const pagination: TablePaginationConfig = {
    position: ["bottomRight"],
    current: Number(page) || 1,
    pageSize: 10,
  };

  return {
    pagination,
    client,
    custodian,
    onChange,
    getSearchParams,
    page,
    ordering,
  };
}

export function useSelectRow<T>({
  key,
  defaultValue,
  onRowClick,
}: ISelectRow<T>) {
  const [selectedRowKey, setSelectedRowKey] = useState<string | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    if (defaultValue) setSelectedRowKey(defaultValue);
  }, [defaultValue]);

  const rowSelection = {
    renderCell: () => null,
    selectedRowKeys: selectedRowKey ? [selectedRowKey] : undefined,
    type: "radio" as RowSelectionType,
    columnWidth: 0,
  };

  function onRow(record: T) {
    return {
      onClick() {
        setSelectedRowKey(record[key] as string);
        onRowClick?.(record);
      },
    };
  }

  return {
    rowSelection,
    onRow,
    selectedRowKey,
    setSelectedRowKey,
  };
}

export function useTableFilter() {
  const { data: currency } = useTransactionServerQuery<ICurrency[]>(
    "/classification/currency/"
  );
  const { data: asset } = useTransactionServerQuery<IAssetClass[]>(
    "/classification/sub-asset/"
  );
  const { data: custodian } =
    useTransactionServerQuery<ICustodian[]>("/custodian/");

  function addFilters(columns: any) {
    switch (columns.key) {
      case "currency":
      case "reporting_currency":
        return {
          ...columns,
          filters: currency?.map(({ code }) => ({ text: code, value: code })),
          filterSearch: true,
        };
      case "statement_type":
        return {
          ...columns,
          filters: StatementOptions.map(({ value, label }) => ({
            text: label,
            value,
          })),
        };
      case "asset_class":
        return {
          ...columns,
          filters: asset?.map(({ sub_asset_class }) => ({
            text: sub_asset_class,
            value: sub_asset_class,
          })),
        };
      case "custodian":
        return {
          ...columns,
          filters: custodian?.map(({ name, id }) => ({
            text: name,
            value: id,
          })),
          filterSearch: true,
        };
      case "trade_action":
        return {
          ...columns,
          filters: TradeActionOptions.map(({ value, label }) => ({
            text: label,
            value,
          })),
        };
      default:
        return columns;
    }
  }
  return { addFilters };
}
