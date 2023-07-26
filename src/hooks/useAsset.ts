import { IAssetClass } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

export default function useAsset() {
  const { data, isLoading, isValidating } = useTransactionServerQuery<
    IAssetClass[]
  >("/classification/sub-asset/");

  return {
    data,
    isLoading: isLoading && !isValidating,
  };
}
