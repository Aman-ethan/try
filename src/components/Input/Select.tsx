import { Select as AntdSelect, SelectProps } from "antd";
import clsx from "clsx";
import { DefaultOptionType } from "rc-select/lib/Select";
import { ReactElement, useId } from "react";

function filterOption(input: string, option?: DefaultOptionType) {
  try {
    const currentInput = input.toLowerCase();
    const searchText =
      typeof option?.label === "string"
        ? option.label
        : (option?.label as ReactElement)?.props?.children[1].props.children;
    return (
      searchText.toLowerCase().includes(currentInput) ||
      option?.value?.toString().toLowerCase().includes(currentInput)
    );
  } catch (error) {
    return false;
  }
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
      className={clsx("initial:w-auto initial:tab:w-full", className)}
      size={size}
      {...props}
    />
  );
}
