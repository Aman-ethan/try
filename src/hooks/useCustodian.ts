import { ICustodian, TCustodianParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "./useQuery";

export default function useCustodian(params?: TCustodianParams) {
  const { data, isLoading, isValidating } = useTransactionServerQuery<
    ICustodian[]
  >(
    `/custodian/${buildURLSearchParams({
      client__id: params?.clientId,
    })}`
  );

  return {
    data,
    isLoading: isLoading && !isValidating,
  };
}
