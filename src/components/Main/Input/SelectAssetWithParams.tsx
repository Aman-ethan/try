import { SelectProps } from "antd";
import Select from "@/components/Input/Select";
import useSelectAssetWithParams from "@/hooks/useSelectAssetWithParams";

export default function SelectAssetWithParams(props: SelectProps) {
  const { value, isLoading, options, onChange } = useSelectAssetWithParams();
  return (
    <Select
      value={value}
      loading={isLoading}
      options={options}
      onChange={onChange}
      {...props}
    />
  );
}
