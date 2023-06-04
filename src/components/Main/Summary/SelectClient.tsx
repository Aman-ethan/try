import { useTransactionServerQuery } from "@/hooks/useQuery";
import Select from "../Common/Select";
import useSearchParams from "@/hooks/useSearchParams";

interface IClientResponse {
  client_id: number;
  id: number;
  name: string;
  rpt_currency: string;
}

function useSelectClient() {
  const { getSearchParams, updateSearchParams } = useSearchParams();
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

export default function SelectClient() {
  const { isLoading, options, onSelect, tradeClientId } = useSelectClient();
  return (
    <Select
      loading={isLoading}
      placeholder="Select a client"
      options={options}
      className="w-36"
      onSelect={onSelect}
      defaultValue={tradeClientId}
    />
  );
}
