import { SegmentedValue } from "antd/es/segmented";
import useTable from "./useTable";

const PAGE_SIZE = 4;

export default function usePositions() {
  const {
    client,
    custodian,
    ordering,
    page,
    pagination,
    getSearchParams,
    updateSearchParams,
  } = useTable({
    pageSize: PAGE_SIZE,
  });

  const search = getSearchParams("search");
  const assetClass = getSearchParams("asset_class");
  const report_date = getSearchParams("report_date");
  const relationshipNumber = getSearchParams("relationship_number");

  function onSegmentChange(value: SegmentedValue) {
    updateSearchParams({
      ordering: value,
    });
  }

  function onPaginationChange(current: number) {
    updateSearchParams({
      page: current,
    });
  }

  return {
    client,
    custodian,
    page,
    pagination,
    relationshipNumber,
    search,
    assetClass,
    ordering,
    report_date,
    onSegmentChange,
    onPaginationChange,
    getSearchParams,
  };
}
