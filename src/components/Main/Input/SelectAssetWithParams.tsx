import Select from "@/components/Input/Select";
import useSelectAssetWithParams from "@/hooks/useSelectAssetWithParams";
import { SelectProps } from "antd";

export default function SelectAssetWithParams(props: SelectProps) {
  const { defaultValue, isLoading, options, onChange } =
    useSelectAssetWithParams();
  return (
    <Select
      defaultValue={defaultValue}
      loading={isLoading}
      options={options}
      onChange={onChange}
      {...props}
    />
  );
}
