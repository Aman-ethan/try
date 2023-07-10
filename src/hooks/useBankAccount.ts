import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { TBankAccountParams } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

interface IBankAccount {
  relationship_number: string;
  portfolio_number: string;
}

export default function useBankAccount(params?: TBankAccountParams) {
  const { data, isLoading } = useTransactionServerQuery<IBankAccount[]>(
    `/bank_account/${buildURLSearchParams({
      client_id: params?.clientId,
      custodian_id: params?.custodianId,
    })}`
  );

  const relationshipNumberOptions = data?.map(({ relationship_number }) => ({
    label: relationship_number,
    value: relationship_number,
  }));

  const portfolioNumberOptions = data
    ?.filter(({ portfolio_number }) => Boolean(portfolio_number))
    .map(({ portfolio_number }) => ({
      label: portfolio_number,
      value: portfolio_number,
    }));

  return {
    relationshipNumberOptions,
    portfolioNumberOptions,
    isLoading,
  };
}
