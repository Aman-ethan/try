import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import { useSessionStorage } from "@mantine/hooks";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IMonthPicker } from "@/interfaces/Main";
import { DATE_PARAM_FORMAT } from "@/constants/format";

interface IMonthPickerProps {
  value?: string;
  disabled?: boolean;
}

export default function MonthPicker({ disabled, value }: IMonthPickerProps) {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );

  const [selectedValue, setSelectedValue] = useSessionStorage<
    string | undefined
  >({
    key: "reportDate",
    defaultValue: getSearchParams("report_date"),
  });
  return (
    <DatePicker.MonthPicker
      className="h-[2.625rem] w-full flex-1 p-4 tab:w-64"
      value={dayjs(value || selectedValue)}
      disabled={disabled}
      size="large"
      format="MMM YYYY"
      disabledDate={(current: Dayjs) =>
        dayjs(current).isAfter(data?.end_date) ||
        dayjs(current).isBefore(data?.start_date)
      }
      onChange={(_value: Dayjs | null) => {
        const reportDate = _value?.endOf("month").format(DATE_PARAM_FORMAT);
        updateSearchParams({
          report_date: reportDate,
        });
        setSelectedValue(reportDate);
      }}
      allowClear
    />
  );
}
