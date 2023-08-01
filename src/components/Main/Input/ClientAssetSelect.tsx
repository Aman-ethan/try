import { SelectProps, Spin } from "antd";
import useAssetSelect from "@/hooks/useAssetSelect";
import Select from "../../Input/Select";

export default function ClientAssetSelect(props: SelectProps) {
  const { isLoading, selectOptions } = useAssetSelect();
  return (
    <Select
      loading={isLoading}
      options={selectOptions}
      {...props}
      notFoundContent={isLoading ? <Spin size="small" /> : undefined}
    />
  );
}
