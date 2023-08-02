import { useAnalyticsServerQuery } from "./useQuery";
import useSelectClientWithParams from "./useSelectClientWithParams";

interface IClientDropdownParams {
  urlKey: string;
  ticker?: any;
}

export default function useRelativeChart<T>({
  urlKey,
  ticker,
}: IClientDropdownParams) {
  const {
    clientId,
    isLoading: isClientLoading,
    onChange,
    options,
    getSearchParams,
    selectedClient,
  } = useSelectClientWithParams();

  const { data, isLoading } = useAnalyticsServerQuery<T>(urlKey, {
    // removed default client_id
    client_id: clientId,
    custodian_id: getSearchParams("custodian"),
    start_date: getSearchParams("start_date"),
    end_date: getSearchParams("end_date"),
    security_id:
      urlKey === "/relative-performance/stocks/" ? ticker : undefined,
    asset_class:
      urlKey === "/relative-performance/networth/" ? ticker : undefined,
  });

  const loading = isClientLoading || isLoading;

  return {
    data,
    loading,
    onChange,
    options,
    selectedClient,
  };
}
