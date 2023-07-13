import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import useSearchParams from "./useSearchParams";

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
