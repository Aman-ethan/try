import { useTransactionServerQuery } from "@/hooks/useQuery";
import Select from "./Select";
import useSearchParams from "@/hooks/useSearchParams";

interface IClientResponse {
  client_id: number;
  id: number;
  name: string;
  rpt_currency: string;
}

interface ISelectClientProps {
  placeholder?: string;
  className?: string;
}

function useSelectClient() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const tradeClientId = getSearchParams("trade_client_id");

  const { data, isLoading } =
    useTransactionServerQuery<IClientResponse[]>("/client/");

  const options = data?.map(({ client_id, name }) => ({
    label: name,
    value: String(client_id),
  }));

  function onSelect(value: string) {
    updateSearchParams({
      trade_client_id: value,
      trade_custodian_id: null,
    });
  }

  return {
    isLoading,
    options,
    onSelect,
    tradeClientId,
  };
}

export default function SelectClient({
  placeholder,
  className,
}: ISelectClientProps) {
  const { isLoading, options, onSelect, tradeClientId } = useSelectClient();
  return (
    <Select
      loading={isLoading}
      placeholder={placeholder}
      options={options}
      onSelect={onSelect}
      defaultValue={tradeClientId}
      className={className}
    />
  );
}
