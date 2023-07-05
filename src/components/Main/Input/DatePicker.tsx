import { DATE_DISPLAY_FORMAT } from "@/constants/format";
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useId } from "react";

function disabledDate(current: Dayjs) {
  return dayjs(current).isAfter(dayjs());
}

export function DatePicker({
  loading,
  defaultValue,
  value,
  className,
  size = "large",
  format = DATE_DISPLAY_FORMAT,
  ...props
}: DatePickerProps & { loading?: boolean }) {
  const datePickerId = useId();

  return (
    <AntdDatePicker
      key={loading ? undefined : datePickerId}
      defaultValue={loading ? undefined : defaultValue}
      value={loading ? undefined : value}
      disabled={loading}
      className={clsx("w-full", className)}
      size={size}
      disabledDate={disabledDate}
      format={format}
      allowClear
      {...props}
    />
  );
}

export function RangePicker({
  loading,
  defaultValue,
  value,
  className,
  ...props
}: RangePickerProps & { loading?: boolean }) {
  const rangePickerId = useId();
  return (
    <AntdDatePicker.RangePicker
      key={loading ? undefined : rangePickerId}
      defaultValue={loading ? undefined : defaultValue}
      value={loading ? undefined : value}
      disabled={loading}
      className={clsx("flex-1", className)}
      {...props}
    />
  );
}
