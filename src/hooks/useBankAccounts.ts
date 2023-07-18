import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { IBankAccount, TBankAccountParams } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";

export default function useBankAccounts(params?: TBankAccountParams) {
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
    data,
    relationshipNumberOptions,
    portfolioNumberOptions,
    isLoading,
  };
}
