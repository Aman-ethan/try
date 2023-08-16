import { IPaginatedResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { StatementSearchParamKeys } from "@/constants/searchParams";
import { useTransactionServerQuery } from "./useQuery";
import useTable from "./useTable";
import useDateRange from "./useDateRange";

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

  const { startDate, endDate } = useDateRange();

  const urlWithParams =
    urlKey +
    buildURLSearchParams({
      client,
      custodian,
      page,
      ordering,
      statement_date__gte: startDate,
      statement_date__lte: endDate,
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
