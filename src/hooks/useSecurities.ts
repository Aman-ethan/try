import { ISecurity } from "@/interfaces/Main";
import { SWRConfiguration } from "swr";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "./useQuery";

interface IUseSecurityParams {
  config: SWRConfiguration;
  queryParams: {
    symbol: string;
  };
}

export default function useSecurities(params?: Partial<IUseSecurityParams>) {
  const { config, queryParams } = params || {};
  const { data, isLoading, isValidating } = useTransactionServerQuery<
    ISecurity[]
  >(`/security/${buildURLSearchParams(queryParams)}`, config);
  const options = data?.map(({ name, symbol }) => ({
    label: name,
    value: symbol,
  }));
  return {
    data,
    isLoading: isLoading && !isValidating,
    options,
  };
}
