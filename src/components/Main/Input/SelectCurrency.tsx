import { flags } from "@/constants/symbols";
import Select from "./Select";
import { SelectProps, Image } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";

interface ICurrency {
  code: string;
  name: string;
  numeric_code: string;
}

type TCurrency = keyof typeof flags;

export default function SelectCurrency(props: SelectProps) {
  const { data, isLoading } = useTransactionServerQuery<ICurrency[]>(
    "/classification/currency/"
  );
  const options = data?.map(({ code, name }) => ({
    label: (
      <div className="space-x-2">
        <Image className="w-4" src={flags[code.toLowerCase() as TCurrency]} />
        <span className="uppercase">{name}</span>
      </div>
    ),
    value: code,
  }));
  return <Select options={options} loading={isLoading} {...props} />;
}
