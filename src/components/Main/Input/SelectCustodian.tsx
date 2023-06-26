import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";
import { preloadTransactionServerQuery } from "@/lib/preload";
import Select from "./Select";

interface ICustodianResponse {
  custodian_id: number;
  custodian_name: string;
  custodian_code: string;
}

interface IPlaceholderProps {
  placeholder?: string;
  className?: string;
}

preloadTransactionServerQuery("/custodian/");

function useSelectCustodian() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const tradeClientId = getSearchParams("trade_client_id");
  const tradeCustodianId = getSearchParams("trade_custodian_id");

  const { data, isLoading } = useTransactionServerQuery<ICustodianResponse[]>(
    `/custodian/${buildURLSearchParams({ client_id: tradeClientId })}`
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

export default function SelectCustodian({
  placeholder,
  className,
}: IPlaceholderProps) {
  const { isLoading, options, onSelect, tradeCustodianId } =
    useSelectCustodian();
  return (
    <Select
      loading={isLoading}
      options={options}
      placeholder={placeholder}
      onSelect={onSelect}
      value={tradeCustodianId}
      className={className}
    />
  );
}
