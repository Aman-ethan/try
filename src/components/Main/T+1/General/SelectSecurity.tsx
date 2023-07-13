import Select from "@/components/Input/Select";
import useSecurity from "@/hooks/useSecurity";
import { SelectProps } from "antd";

export default function SelectSecurity(props: SelectProps) {
  const { options, isLoading } = useSecurity();
  return <Select options={options} loading={isLoading} {...props} />;
}
