import { SelectProps } from "antd";
import Select from "@/components/Input/Select";
import useSecurityWithParams from "@/hooks/useSecurityWithParams";

export default function SelectSecurityWithParams(props: SelectProps) {
  const { options, onChange, value } = useSecurityWithParams();
  return (
    <Select value={value} options={options} onChange={onChange} {...props} />
  );
}
