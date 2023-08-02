import { SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useAnalyticsServerGetQuery } from "./useQuery";
import useSelectClientWithParams from "./useSelectClientWithParams";

const URLS = {
  get: `/relative-performance/asset-class`,
};

type TAsset = string[];

interface IUseAssetSelect {
  searchParamKey?: SearchParams;
}

export default function useAssetSelect(props?: IUseAssetSelect) {
  const searchParamKey = props?.searchParamKey;

  const { clientId } = useSelectClientWithParams({ searchParamKey });
  const { data, isLoading } = useAnalyticsServerGetQuery<TAsset>(`${
    URLS.get
  }/${buildURLSearchParams({
    client_id: clientId,
  })}
  `);
  const selectOptions = data?.map?.((item: string) => ({
    label: item,
    value: item,
  }));

  return { selectOptions, isLoading };
}
