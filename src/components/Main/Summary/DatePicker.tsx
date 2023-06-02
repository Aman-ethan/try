"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSummaryParams, {
  IUpdateSummaryParams,
  SummaryParams,
} from "@/hooks/useSummaryParams";
import { dateFormat } from "@/lib/format";
import { DatePicker as AntdDatePicker, Result, Skeleton } from "antd";
import dayjs, { Dayjs, ManipulateType } from "dayjs";

interface IDateResponse {
  first_date: string;
  last_date: string;
}

const DEFAULT_DURATION: ManipulateType = "y";

function useDatePicker() {
  const { selectedDate, selectedDuration, updateSummaryParams } =
    useSummaryParams();

  const { data, isLoading, error } = useTransactionServerQuery<IDateResponse>(
    `/position_history/asset_networth/date_parser/`,
    {
      onSuccess(data) {
        const selectedDateParams: IUpdateSummaryParams = [
          SummaryParams.SelectedDate,
          data.last_date,
        ];
        const selectedDurationParams: IUpdateSummaryParams = [
          SummaryParams.SelectedDuration,
          DEFAULT_DURATION,
        ];
        if (!(selectedDate || selectedDuration))
          return updateSummaryParams([
            selectedDateParams,
            selectedDurationParams,
          ]);
        if (!selectedDate) updateSummaryParams([selectedDateParams]);
        if (!selectedDuration) updateSummaryParams([selectedDurationParams]);
      },
    }
  );

  const { first_date, last_date } = data || {};

  function disabledDate(current: Dayjs) {
    return (
      dayjs(current).isBefore(first_date) || dayjs(current).isAfter(last_date)
    );
  }

  function onChange(date: Dayjs | null) {
    if (!date) return;
    updateSummaryParams([[SummaryParams.SelectedDate, date]]);
  }

  return {
    isLoading,
    error,
    disabledDate,
    onChange,
    defaultValue: dayjs(selectedDate || last_date),
  };
}

export default function DatePicker() {
  const { isLoading, error, defaultValue, disabledDate, onChange } =
    useDatePicker();

  if (isLoading) return <></>;

  if (error) return <Result status="error" />;

  return (
    <AntdDatePicker
      defaultValue={defaultValue}
      disabledDate={disabledDate}
      onChange={onChange}
      format={dateFormat}
      allowClear={false}
    />
  );
}
