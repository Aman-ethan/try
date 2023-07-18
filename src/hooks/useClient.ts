import { TCurrency } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";
import useSearchParams from "./useSearchParams";

interface IClient {
  name: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  reporting_currency: TCurrency;
}

export default function useClient() {
  const { get: getSearchParams } = useSearchParams();
  const clientId = getSearchParams("client_id");
  const { data, isLoading } = useTransactionServerQuery<IClient>(
    `/client/${clientId ? `${clientId}/` : ""}`
  );

  return {
    data,
    isLoading,
  };
}
