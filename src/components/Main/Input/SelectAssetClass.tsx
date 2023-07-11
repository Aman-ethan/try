import { SelectProps } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import Select from "../../Input/Select";

interface ISubAsset {
  sub_asset_class: string;
}

export default function SelectAssetClass(props: SelectProps) {
  const { data, isLoading } = useTransactionServerQuery<ISubAsset[]>(
    "/classification/sub-asset/"
  );
  const options = data?.map(({ sub_asset_class }) => ({
    label: sub_asset_class,
    value: sub_asset_class,
  }));
  return <Select loading={isLoading} options={options} {...props} />;
}
