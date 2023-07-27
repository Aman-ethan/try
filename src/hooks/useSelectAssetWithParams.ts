import useSearchParams from "./useSearchParams";
import useSelectAsset from "./useSelectAsset";

export default function useSelectAssetWithParams() {
  const { isLoading, options } = useSelectAsset();
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const assetClass = getSearchParams("asset_class__in");

  function onChange(value: string) {
    updateSearchParams({ asset_class__in: value });
  }

  return {
    value: assetClass,
    isLoading,
    options,
    onChange,
  };
}
