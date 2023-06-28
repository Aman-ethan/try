import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import { ISelectClientProps } from "@/interfaces/Main";
import Select from "../Input/Select";

export default function SelectClientWithParams({
  placeholder,
  className,
}: ISelectClientProps) {
  const { isLoading, options, onChange, clientId } =
    useSelectClientWithParams();
  return (
    <Select
      loading={isLoading}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      value={clientId}
      className={className}
    />
  );
}
