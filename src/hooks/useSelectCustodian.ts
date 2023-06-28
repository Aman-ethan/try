import { ICustodianResponse } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "./useQuery";

export default function useSelectCustodian(clientId?: string | null) {
  const { data, isLoading } = useTransactionServerQuery<ICustodianResponse[]>(
    `/custodian/${buildURLSearchParams({ client_id: clientId })}`
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
