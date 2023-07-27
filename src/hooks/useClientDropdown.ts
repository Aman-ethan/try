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
  } = useSelectClientWithParams({ searchParamKey });

  const selectedClient =
    options?.find(({ value }) => value === clientId) || options?.[0];

  const { data, isLoading } = useAnalyticsServerQuery<T>(
    selectedClient ? urlKey : null,
    {
      client_id: selectedClient?.value,
      start_date: "2021-01-01",
      end_date: "2021-12-31",
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
