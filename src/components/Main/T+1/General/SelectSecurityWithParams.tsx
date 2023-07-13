import Select from "@/components/Input/Select";
import useSecurityWithParams from "@/hooks/useSecurityWithParams";
import { SelectProps } from "antd";

export default function SelectSecurityWithParams(props: SelectProps) {
  const { options, onChange, defaultValue } = useSecurityWithParams();
  return (
    <Select
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      {...props}
    />
  );
}
