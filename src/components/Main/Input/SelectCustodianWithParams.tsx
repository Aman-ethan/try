import { SelectProps } from "antd";
import useSelectCustodianWithParams from "@/hooks/useSelectCustodianWithParams";
import { SearchParams } from "@/interfaces/Main";
import Select from "../../Input/Select";

export default function SelectCustodianWithParams({
  searchParamKey,
  ...props
}: SelectProps & { searchParamKey?: SearchParams }) {
  const { isLoading, options, onChange, custodianId } =
    useSelectCustodianWithParams({ searchParamKey });
  return (
    <Select
      loading={isLoading}
      options={options}
      onChange={onChange}
      value={custodianId}
      {...props}
    />
  );
}
