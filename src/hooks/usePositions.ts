import { SegmentedValue } from "antd/es/segmented";
import useSearchParams from "./useSearchParams";

export default function usePositions() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const client = getSearchParams("client");
  const custodian = getSearchParams("custodian");
  const relationshipNumber = getSearchParams("relationship_number");
  const search = getSearchParams("search");
  const assetClass = getSearchParams("asset_class__in");
  const ordering = getSearchParams("ordering");

  function onSegmentChange(value: SegmentedValue) {
    updateSearchParams({ ordering: value });
  }

  function onChange(value: string) {
    updateSearchParams({ ordering: value });
  }

  return {
    client,
    custodian,
    relationshipNumber,
    search,
    assetClass,
    ordering,
    onSegmentChange,
    onChange,
  };
}
