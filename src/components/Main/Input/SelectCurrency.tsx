import { SelectProps } from "antd";
import Image from "next/image";
import { flags } from "@/constants/flags";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { ICurrency, TCurrency } from "@/interfaces/Main";
import Select from "../../Input/Select";

export default function SelectCurrency(props: SelectProps) {
  const { data, isLoading } = useTransactionServerQuery<ICurrency[]>(
    "/classification/currency/"
  );
  const options = data?.map(({ code, name }) => {
    const flag = code ? flags[code.toLowerCase() as TCurrency] : flags.all;
    return {
      label: (
        <div className="space-x-2">
          <Image alt="flag" width={16} height={12} src={flag} />
          <span className="capitalize">{name}</span>
        </div>
      ),
      value: code,
    };
  });
  return <Select options={options} loading={isLoading} {...props} />;
}
