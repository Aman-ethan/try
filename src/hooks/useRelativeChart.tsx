import { useAnalyticsServerQuery } from "./useQuery";
import useSelectClientWithParams from "./useSelectClientWithParams";

interface IClientDropdownParams {
  urlKey: string;
  asset_class?: any;
  ticker?: any;
}

export default function useRelativeChart<T>({
  urlKey,
  ticker,
  asset_class,
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
    client_id: selectedClient?.value || clientId,
    custodian_id: getSearchParams("custodian"),
    start_date: getSearchParams("start_date"),
    end_date: getSearchParams("end_date"),
    security_id: ticker,
    asset_class,
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
