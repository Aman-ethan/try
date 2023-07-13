import { SelectProps } from "antd";
import useSelectAsset from "@/hooks/useSelectAsset";
import Select from "../../Input/Select";

export default function SelectAsset(props: SelectProps) {
  const { isLoading, options } = useSelectAsset();
  return <Select loading={isLoading} options={options} {...props} />;
}
