import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { IClientResponse } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

export default function useSelectClient(custodianId?: string | null) {
  const { data, isLoading } = useTransactionServerQuery<IClientResponse[]>(
    `/client/${buildURLSearchParams({ custodian_id: custodianId })}`
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
