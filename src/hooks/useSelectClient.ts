import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { IClientResponse, TSelectClientParams } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

export default function useSelectClient(params?: TSelectClientParams) {
  const { data, isLoading } = useTransactionServerQuery<IClientResponse[]>(
    `/client/${buildURLSearchParams({
      custodians__id: params?.custodianId,
    })}`
  );
  const options = data?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return {
    isLoading,
    options,
  };
}
