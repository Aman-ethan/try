import { IMonthPicker } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";
import useSearchParams from "./useSearchParams";

export default function useReportDate() {
  const { get: getSearchParams } = useSearchParams();

  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );

  const currentValue =
    getSearchParams("report_date") || data?.end_date || undefined;

  return currentValue;
}
