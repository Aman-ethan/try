import { Select as AntdSelect, SelectProps } from "antd";
import { useId } from "react";

export default function Select({
  loading,
  defaultValue,
  value,
  ...props
}: SelectProps) {
  const selectId = useId();

  return (
    <AntdSelect
      key={loading ? undefined : selectId}
      defaultValue={loading ? undefined : defaultValue}
      value={loading ? undefined : value}
      disabled={loading}
      {...props}
    />
  );
}
