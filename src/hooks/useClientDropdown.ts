import { SearchParams } from "@/interfaces/Main";
import { useAnalyticsServerQuery } from "./useQuery";
import useSelectClientWithParams from "./useSelectClientWithParams";

interface IClientDropdownParams {
  urlKey: string;
  searchParamKey: SearchParams;
}

export default function useClientDropdown<T>({
  urlKey,
  searchParamKey,
}: IClientDropdownParams) {
  const {
    clientId,
    isLoading: isClientLoading,
    onChange,
    options,
    getSearchParams,
  } = useSelectClientWithParams({ searchParamKey });

  const defaultOption = options?.[0];
  const selectedClient =
    options?.find(({ value }) => value === clientId) || defaultOption;

  const { data, isLoading } = useAnalyticsServerQuery<T>(
    selectedClient ? urlKey : null,
    {
      client_id: selectedClient?.value,
      start_date: getSearchParams("start_date"),
      end_date: getSearchParams("end_date"),
      asset_class: [] as unknown as string,
    }
  );

  const loading = isClientLoading || isLoading;

  return {
    data,
    loading,
    onChange,
    options,
    selectedClient,
  };
}
