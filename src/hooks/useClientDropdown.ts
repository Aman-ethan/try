import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "./useQuery";
import useSelectClientWithParams from "./useSelectClientWithParams";

interface IUseClientDropdownParams<T> {
  urlKey: string;
  mapper: (_item: T) => Record<string, string | number>;
}

export default function useClientDropdown<T>({
  urlKey,
  mapper,
}: IUseClientDropdownParams<T>) {
  const {
    clientId,
    isLoading: isClientLoading,
    options: clientOptions,
    onChange: onClientChange,
  } = useSelectClientWithParams();

  const { data, isLoading } = useTransactionServerQuery<T[]>(
    urlKey +
      buildURLSearchParams({
        client_id: clientId,
      })
  );

  const selectedClient =
    clientOptions?.find(({ value }) => value === clientId) ||
    clientOptions?.[0];

  return {
    isLoading,
    isClientLoading,
    data: data?.map((item) => mapper(item)) || [],
    selectedClient,
    clientOptions,
    onClientChange,
  };
}
