import { ICustodian, TSelectCustodianParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "./useQuery";

export default function useSelectCustodian(params?: TSelectCustodianParams) {
  const { data, isLoading } = useTransactionServerQuery<ICustodian[]>(
    `/custodian/${buildURLSearchParams({
      client__id: params?.clientId,
    })}`
  );

  const options = data?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return {
    options,
    isLoading,
  };
}
