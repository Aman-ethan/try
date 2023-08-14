import { SearchParams } from "@/interfaces/Main";
import useDateRange from "./useDateRange";
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
    isLoading: isClientLoading,
    onChange,
    options,
    selectedClient,
  } = useSelectClientWithParams({ searchParamKey });

  const { startDate, endDate } = useDateRange();

  const { data, isLoading } = useAnalyticsServerQuery<T>(
    selectedClient ? urlKey : null,
    {
      client_id: selectedClient?.value,
      start_date: startDate,
      end_date: endDate,
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
