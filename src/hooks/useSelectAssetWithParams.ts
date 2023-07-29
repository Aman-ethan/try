import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectAsset from "./useSelectAsset";

export default function useSelectAssetWithParams() {
  const { isLoading, options } = useSelectAsset();
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client");

  const assetClass = getSearchParams("asset_class__in");

  useDependentSelect({
    dependsOn: clientId,
    dependentProps: {
      value: assetClass,
      options,
      isLoading,
      reset: () => {
        updateSearchParams({
          asset_class__in: null,
        });
      },
    },
  });

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
