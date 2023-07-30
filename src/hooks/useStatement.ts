import { IPaginatedResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { useTransactionServerQuery } from "./useQuery";
import useTable from "./useTable";

interface IUseStatementParams {
  urlKey: string;
}

const searchParamsKey = [
  "asset_class__in",
  "currency__in",
  "custodian__in",
  "reporting_currency__in",
  "statement_date__gte",
  "statement_date__lte",
  "statement_type__in",
  "transaction_type__in",
  "trade_action__in",
  "search",
];

export default function useStatement<T>({ urlKey }: IUseStatementParams) {
  const {
    getSearchParams,
    onChange,
    pagination,
    page,
    ordering,
    client,
    custodian,
  } = useTable();

  const { data, isLoading } = useTransactionServerQuery<IPaginatedResponse<T>>(
    urlKey +
      buildURLSearchParams({
        client,
        custodian,
        page,
        ordering,
        ...searchParamsKey.reduce(
          (acc, key) => ({
            ...acc,
            [key]: getSearchParams(key as SearchParams),
          }),
          {}
        ),
      })
  );

  return {
    data,
    isLoading,
    pagination,
    onChange,
  };
}
