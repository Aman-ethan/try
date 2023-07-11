import { SelectProps } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import Select from "./Select";

interface ISubAsset {
  id: string;
  asset_class: string;
  sub_asset_class: string;
}

export default function SelectAssetClass(props: SelectProps) {
  const { data, isLoading } = useTransactionServerQuery<ISubAsset[]>(
    "/classification/sub-asset/"
  );
  const options = data?.map(({ id, asset_class, sub_asset_class }) => ({
    label: `${sub_asset_class} - ${asset_class}`,
    value: id,
  }));
  return <Select loading={isLoading} options={options} {...props} />;
}
