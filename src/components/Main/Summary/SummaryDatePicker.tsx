"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams, { IUpdateSearchParams } from "@/hooks/useSearchParams";
import { DATE_DISPLAY_FORMAT, DATE_PARAM_FORMAT } from "@/lib/constant";
import { Result } from "antd";
import dayjs, { Dayjs, ManipulateType } from "dayjs";
import { DatePicker } from "../Common/DatePicker";

interface IDateResponse {
  data: { first_date: string; last_date: string };
}

const DEFAULT_DURATION: ManipulateType = "y";

function useSummaryDatePicker() {
  const { updateSearchParams, getSearchParams } = useSearchParams();
  const selectedDate = getSearchParams("selected_date");
  const selectedDuration = getSearchParams("selected_duration");

  const { data, isLoading, error } = useTransactionServerQuery<IDateResponse>(
    `/position_history/asset_networth/date_parser/`,
    {
      onSuccess({ data }) {
        const selectedDateParams: IUpdateSearchParams = {
          selected_date: data.last_date,
        };
        const selectedDurationParams: IUpdateSearchParams = {
          selected_duration: DEFAULT_DURATION,
        };
        if (!(selectedDate || selectedDuration))
          return updateSearchParams({
            ...selectedDateParams,
            ...selectedDurationParams,
          });
        if (!selectedDate) updateSearchParams(selectedDateParams);
        if (!selectedDuration) updateSearchParams(selectedDurationParams);
      },
    }
  );

  const { first_date, last_date } = data?.data || {};

  function disabledDate(current: Dayjs) {
    return (
      dayjs(current).isBefore(first_date) || dayjs(current).isAfter(last_date)
    );
  }

  function onChange(date: Dayjs | null) {
    if (!date) return;
    updateSearchParams({
      selected_date: date.format(DATE_PARAM_FORMAT),
    });
  }

  return {
    isLoading,
    error,
    disabledDate,
    onChange,
    defaultValue: dayjs(selectedDate || last_date),
  };
}

export default function SummaryDatePicker() {
  const { isLoading, error, defaultValue, disabledDate, onChange } =
    useSummaryDatePicker();

  if (error) return <Result status="error" />;

  return (
    <DatePicker
      size="large"
      loading={isLoading}
      defaultValue={defaultValue}
      disabledDate={disabledDate}
      onChange={onChange}
      format={DATE_DISPLAY_FORMAT}
      allowClear={false}
    />
  );
}
