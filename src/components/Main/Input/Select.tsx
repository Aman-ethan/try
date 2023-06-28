import { Select as AntdSelect, SelectProps } from "antd";
import clsx from "clsx";
import { useId } from "react";

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
      showSearch
      key={loading ? selectId : undefined}
      defaultValue={loading ? undefined : defaultValue}
      value={loading ? undefined : value}
      disabled={loading}
      className={clsx("w-full", className)}
      size={size}
      {...props}
    />
  );
}
