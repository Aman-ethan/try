import useSelectCustodianWithParams from "@/hooks/useSelectCustodianWithParams";
import { SearchParams } from "@/interfaces/Main";
import { SelectProps } from "antd";
import Select from "../../Input/Select";

export default function SelectCustodianWithParams(
  props: SelectProps & { searchParamKey?: SearchParams }
) {
  const { isLoading, options, onChange, custodianId } =
    useSelectCustodianWithParams();
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
