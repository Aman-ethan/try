import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import clsx from "clsx";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IMonthPicker } from "@/interfaces/Main";
import { DATE_PARAM_FORMAT } from "@/constants/format";

interface IMonthPickerProps {
  value?: string;
  disabled?: boolean;
  className?: string;
}

export default function MonthPicker({
  className,
  disabled,
  value,
}: IMonthPickerProps) {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const { data } = useTransactionServerQuery<IMonthPicker>(
    `/statement/position/date/`
  );
  const selectedDate = getSearchParams("report_date");
  return (
    <DatePicker.MonthPicker
      className={clsx(
        "h-[2.625rem] w-full flex-1 tab:max-w-[14rem] lap:max-w-[16rem]",
        className
      )}
      value={dayjs(value || selectedDate)}
      disabled={disabled}
      size="large"
      format="MMM YYYY"
      disabledDate={(current: Dayjs) =>
        dayjs(current).isAfter(data?.end_date) ||
        dayjs(current).isBefore(data?.start_date)
      }
      onChange={(_value: Dayjs | null) => {
        updateSearchParams({
          report_date: _value?.endOf("month").format(DATE_PARAM_FORMAT),
        });
      }}
      allowClear
    />
  );
}
