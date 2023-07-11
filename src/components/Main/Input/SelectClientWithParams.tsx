import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import { SelectProps } from "antd";
import Select from "../../Input/Select";

export default function SelectClientWithParams(props: SelectProps) {
  const { isLoading, options, onChange, clientId } =
    useSelectClientWithParams();
  return (
    <Select
      loading={isLoading}
      options={options}
      onChange={onChange}
      value={clientId}
      {...props}
    />
  );
}
