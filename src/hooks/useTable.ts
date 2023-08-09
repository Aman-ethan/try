import {
  FilterValue,
  RowSelectionType,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { useLayoutEffect, useState } from "react";
import { StatementOptions, TradeActionOptions } from "@/constants/options";
import { ICurrency, IUseTableParams, SearchParams } from "@/interfaces/Main";
import { DEFAULT_PAGE_SIZE } from "@/constants/table";
import { useTransactionServerQuery } from "./useQuery";
import useSearchParams from "./useSearchParams";
import useCustodian from "./useCustodian";
import useAsset from "./useAsset";
import useSecurities from "./useSecurities";

interface ISelectRow<T> {
  key: keyof T;
  defaultValue?: string;
  onRowClick?: (_record: T) => void;
}

const defaultSearchParamsKeys: Record<string, SearchParams> = {
  client: "client",
  page: "page",
};

export default function useTable(props?: IUseTableParams) {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const clientKey =
    props?.searchParamKeys?.client || defaultSearchParamsKeys.client;
  const pageKey = props?.searchParamKeys?.page || defaultSearchParamsKeys.page;

  const client = getSearchParams(clientKey);
  const page = getSearchParams(pageKey);
  const custodian = getSearchParams("custodian");
  const ordering = getSearchParams("ordering");
  const currency__in = getSearchParams("currency__in");

  function onChange<T>(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) {
    const { field, order } = sorter as SorterResult<T>;
    const _ordering = order === "descend" ? `-${field}` : field?.toString();

    updateSearchParams({
      ...filters,
      [pageKey]: String(pagination.current),
      ordering: order ? _ordering : undefined,
      page_size: String(pagination.pageSize),
    });
  }

  const pagination: TablePaginationConfig = {
    position: ["bottomRight"],
    current: Number(page) || 1,
    pageSize: props?.page_size || DEFAULT_PAGE_SIZE,
  };

  return {
    pagination,
    client,
    custodian,
    onChange,
    getSearchParams,
    page,
    ordering,
    currency__in,
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

const searchParamsKeys = [
  "currency__in",
  "reporting_currency__in",
  "statement_type__in",
  "asset_class__in",
  "custodian__in",
  "security__in",
  "trade_action__in",
];

export function useTableFilter() {
  const { get: getSearchParams } = useSearchParams();
  const { data: currency } = useTransactionServerQuery<ICurrency[]>(
    "/classification/currency/"
  );
  const { data: asset } = useAsset();
  const { data: custodian } = useCustodian();
  const { data: security } = useSecurities();

  const searchParams: Record<SearchParams, string | undefined> =
    searchParamsKeys.reduce(
      (acc, key) => ({ ...acc, [key]: getSearchParams(key as SearchParams) }),
      {} as Record<SearchParams, string>
    );

  function addFilters(columns: any) {
    switch (columns.key) {
      case "currency__in":
      case "reporting_currency__in":
        return {
          ...columns,
          filters: currency?.map(({ code }) => ({ text: code, value: code })),
          filterSearch: true,
          filteredValue:
            searchParams.currency__in?.split(",") ||
            searchParams.reporting_currency__in?.split(","),
        };
      case "statement_type__in":
        return {
          ...columns,
          filters: StatementOptions.map(({ value, label }) => ({
            text: label,
            value,
          })),
          filteredValue: searchParams.statement_type__in?.split(","),
        };
      case "asset_class__in":
        return {
          ...columns,
          filters: asset?.map(({ sub_asset_class }) => ({
            text: sub_asset_class,
            value: sub_asset_class,
          })),
          filterSearch: true,
          filteredValue: searchParams.asset_class__in?.split(","),
        };
      case "custodian__in":
        return {
          ...columns,
          filters: custodian?.map(({ name, id }) => ({
            text: name,
            value: id,
          })),
          filterSearch: true,
          filteredValue: searchParams.custodian__in?.split(","),
        };
      case "security__in":
        return {
          ...columns,
          filters: security?.map(({ symbol }) => ({
            text: symbol,
            value: symbol,
          })),
          filterSearch: true,
          filteredValue: searchParams.security__in?.split(","),
        };
      case "trade_action__in":
        return {
          ...columns,
          filters: TradeActionOptions.map(({ value, label }) => ({
            text: label,
            value,
          })),
          filteredValue: searchParams.trade_action__in?.split(","),
        };
      default:
        return columns;
    }
  }
  return { addFilters };
}
