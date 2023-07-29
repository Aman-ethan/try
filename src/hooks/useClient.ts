import { TCurrency } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

interface IClient {
  name: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  reporting_currency: TCurrency;
}

export default function useClient({ id }: { id?: string }) {
  const { data, isLoading } = useTransactionServerQuery<IClient>(
    id ? `/client/${id}/` : null
  );

  return {
    data,
    isLoading: isLoading || !id,
  };
}
