import { Select as AntdSelect, SelectProps } from "antd";
import clsx from "clsx";
import { DefaultOptionType } from "rc-select/lib/Select";
import { useId } from "react";

function filterOption(input: string, option?: DefaultOptionType) {
  return ((option?.label ?? "") as string)
    .toLowerCase()
    .includes(input.toLowerCase());
}

export default function Select({
  loading,
  defaultValue,
  value,
  className,
  size = "large",
  ...props
}: SelectProps) {
  const selectId = useId();

  return (
    <AntdSelect
      allowClear
      showSearch
      filterOption={filterOption}
      key={loading ? selectId : undefined}
      defaultValue={loading ? undefined : defaultValue}
      value={loading ? undefined : value}
      disabled={loading}
      className={clsx("initial:w-full", className)}
      size={size}
      {...props}
    />
  );
}
