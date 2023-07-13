import { useTransactionServerQuery } from "./useQuery";

interface IAssetClass {
  sub_asset_class: string;
}

export default function useSelectAsset() {
  const { data, isLoading } = useTransactionServerQuery<IAssetClass[]>(
    "/classification/sub-asset/"
  );

  const options = data?.map(({ sub_asset_class }) => ({
    label: sub_asset_class,
    value: sub_asset_class,
  }));

  return {
    isLoading,
    options,
  };
}
