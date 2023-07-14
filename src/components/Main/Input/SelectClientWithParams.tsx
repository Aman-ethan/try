import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import { SearchParams } from "@/interfaces/Main";
import { SelectProps } from "antd";
import Select from "../../Input/Select";

export default function SelectClientWithParams({
  searchParamKey,
  ...props
}: SelectProps & { searchParamKey?: SearchParams }) {
  const { isLoading, options, onChange, clientId } = useSelectClientWithParams({
    searchParamKey,
  });
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
