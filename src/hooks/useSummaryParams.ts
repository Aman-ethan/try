import { Dayjs, ManipulateType, isDayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export enum SummaryParams {
  SelectedDate = "selected_date",
  SelectedDuration = "selected_duration",
}

export type IUpdateSummaryParams = [
  key: SummaryParams,
  value: string | Dayjs | ManipulateType
];

const DATE_FORMAT = "YYYY-MM-DD";

export default function useSummaryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function updateSummaryParams(updateParams: IUpdateSummaryParams[]) {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of updateParams) {
      if (isDayjs(value)) {
        urlSearchParams.append(key, value.format(DATE_FORMAT));
      } else {
        urlSearchParams.append(key, value);
      }
    }
    for (const [key, value] of searchParams.entries()) {
      if (!updateParams.map((param) => param[0] as string).includes(key)) {
        urlSearchParams.append(key, value);
      }
    }
    router.push("/summary?" + urlSearchParams);
  }

  return {
    selectedDate: searchParams.get(SummaryParams.SelectedDate) as string,
    selectedDuration: searchParams.get(
      SummaryParams.SelectedDuration
    ) as ManipulateType,
    updateSummaryParams,
  };
}
