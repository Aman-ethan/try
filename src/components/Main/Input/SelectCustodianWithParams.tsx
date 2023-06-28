import useSelectCustodianWithParams from "@/hooks/useSelectCustodianWithParams";
import { SelectProps } from "antd";
import Select from "./Select";

export default function SelectCustodianWithParams(props: SelectProps) {
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
