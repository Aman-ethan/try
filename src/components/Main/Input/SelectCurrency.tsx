import { flags } from "@/constants/flags";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { TCurrency } from "@/interfaces/Main";
import { Image, SelectProps } from "antd";
import Select from "../../Input/Select";

interface ICurrency {
  code: string;
  name: string;
  numeric_code: string;
}

export default function SelectCurrency(props: SelectProps) {
  const { data, isLoading } = useTransactionServerQuery<ICurrency[]>(
    "/classification/currency/"
  );
  const options = data?.map(({ code, name }) => {
    const flag = flags[code.toLowerCase() as TCurrency] || flags.all;
    return {
      label: (
        <div className="space-x-2">
          <Image width={16} src={flag} />
          <span className="capitalize">{name}</span>
        </div>
      ),
      value: code,
    };
  });
  return <Select options={options} loading={isLoading} {...props} />;
}
