import { Select as AntdSelect, SelectProps } from "antd";
import { useId } from "react";

export default function Select({
  loading,
  defaultValue,
  ...props
}: SelectProps) {
  const selectId = useId();

  return (
    <AntdSelect
      key={loading ? undefined : selectId}
      defaultValue={loading ? undefined : defaultValue}
      {...props}
    />
  );
}
