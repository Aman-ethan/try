import { IPaginatedResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { StatementSearchParamKeys } from "@/constants/searchParams";
import { useTransactionServerQuery } from "./useQuery";
import useTable from "./useTable";

interface IUseStatementParams {
  urlKey: string;
}

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

  const urlWithParams =
    urlKey +
    buildURLSearchParams({
      client,
      custodian,
      page,
      ordering,
      ...StatementSearchParamKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: getSearchParams(key as SearchParams),
        }),
        {}
      ),
    });

  const { data, isLoading } =
    useTransactionServerQuery<IPaginatedResponse<T>>(urlWithParams);

  return {
    data,
    isLoading,
    pagination,
    onChange,
    urlWithParams,
  };
}
