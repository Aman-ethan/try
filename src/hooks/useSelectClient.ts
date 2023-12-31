import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { IClientResponse, TSelectClientParams } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

export default function useSelectClient(params?: TSelectClientParams) {
  const { data, isLoading, isValidating } = useTransactionServerQuery<
    IClientResponse[]
  >(
    `/client/${buildURLSearchParams({
      custodians__id: params?.custodianId,
    })}`
  );

  const options = data
    ?.filter(({ name }) => Boolean(name))
    .map(({ id, name }) => ({
      label: name,
      value: id,
      key: id,
    }));

  return {
    isLoading: isLoading && !isValidating,
    options,
  };
}
