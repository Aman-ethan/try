import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import clsx from "clsx";
import { useId } from "react";

export function DatePicker({
  loading,
  defaultValue,
  value,
  className,
  size = "large",
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