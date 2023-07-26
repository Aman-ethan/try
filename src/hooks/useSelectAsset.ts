import useAsset from "./useAsset";

export default function useSelectAsset() {
  const { data, isLoading } = useAsset();

  const options = data?.map(({ sub_asset_class }) => ({
    label: sub_asset_class,
    value: sub_asset_class,
  }));

  return {
    isLoading,
    options,
  };
}
