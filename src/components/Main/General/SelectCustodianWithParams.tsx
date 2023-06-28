import useSelectCustodianWithParams from "@/hooks/useSelectCustodianWithParams";
import { ISelectClientProps } from "@/interfaces/Main";
import Select from "../Input/Select";

export default function SelectCustodianWithParams({
  placeholder,
  className,
}: ISelectClientProps) {
  const { isLoading, options, onChange, custodianId } =
    useSelectCustodianWithParams();
  return (
    <Select
      loading={isLoading}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={custodianId}
      className={className}
    />
  );
}
