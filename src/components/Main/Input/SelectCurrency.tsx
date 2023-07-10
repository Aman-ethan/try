import { flags } from "@/constants/symbols";
import Select from "./Select";
import { SelectProps, Image } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";

interface ICurrency {
  code: string;
  name: string;
  numeric_code: string;
}

const CurrencyOptions = Object.entries(flags).map(([key, value]) => ({
  label: (
    <div className="space-x-2">
      <Image className="w-4" src={value} />
      <span className="uppercase">{key}</span>
    </div>
  ),
  value: key,
}));

export default function SelectCurrency(props: SelectProps) {
  const { data, isLoading } = useTransactionServerQuery<ICurrency[]>(
    "/classification/currency/"
  );
  const options = data?.map(({ code, name }) => ({
    label: name,
    value: code,
  }));
  return <Select options={options} loading={isLoading} {...props} />;
}
