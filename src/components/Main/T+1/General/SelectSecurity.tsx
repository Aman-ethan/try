import Select from "@/components/Input/Select";
import useSecurities from "@/hooks/useSecurities";
import { SelectProps } from "antd";

export default function SelectSecurity(props: SelectProps) {
  const { options, isLoading } = useSecurities();
  return <Select options={options} loading={isLoading} {...props} />;
}
