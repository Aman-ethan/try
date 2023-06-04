import { useTransactionServerQuery } from "@/hooks/useQuery";
import Select from "../Common/Select";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";

interface ICustodianResponse {
  custodian_id: number;
  custodian_name: string;
  custodian_code: string;
}

function useSelectCustodian() {
  const { getSearchParams, updateSearchParams } = useSearchParams();
  const tradeClientId = getSearchParams("trade_client_id");
  const tradeCustodianId = getSearchParams("trade_custodian_id");

  const { data, isLoading } = useTransactionServerQuery<ICustodianResponse[]>(
    "/custodian/" + buildURLSearchParams({ client_id: tradeClientId })
  );

  const options = data?.map(({ custodian_id, custodian_name }) => ({
    label: custodian_name,
    value: String(custodian_id),
  }));

  function onSelect(value: string) {
    updateSearchParams({
      trade_custodian_id: value,
    });
  }

  return {
    isLoading,
    options,
    onSelect,
    tradeCustodianId,
  };
}

export default function SelectCustodian() {
  const { isLoading, options, onSelect, tradeCustodianId } =
    useSelectCustodian();
  return (
    <Select
      loading={isLoading}
      options={options}
      placeholder="Select a custodian"
      className="w-44"
      onSelect={onSelect}
      value={tradeCustodianId}
    />
  );
}
