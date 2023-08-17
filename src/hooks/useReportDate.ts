import { useSessionStorage } from "@mantine/hooks";
import { IMonthPicker } from "@/interfaces/Main";
import { useTransactionServerQuery } from "./useQuery";
import useSearchParams from "./useSearchParams";

export default function useReportDate() {
  const { get: getSearchParams } = useSearchParams();
  const [reportDate] = useSessionStorage<string>({
    key: "reportDate",
  });

  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );

  const currentValue =
    getSearchParams("report_date") ||
    reportDate ||
    data?.end_date ||
    undefined;

  return currentValue;
}
