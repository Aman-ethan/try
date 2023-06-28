import usePrevious from "./usePrevious";
import useSearchParams from "./useSearchParams";
import useSelectCustodian from "./useSelectCustodian";

export default function useSelectCustodianWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client_id");
  const custodianId = getSearchParams("custodian_id");

  const { options, isLoading } = useSelectCustodian(clientId);

  const { isEqual } = usePrevious({ value: clientId, update: !isLoading });

  if (!isEqual) {
    if (!options?.find(({ value }) => value === custodianId)) {
      updateSearchParams({
        custodian_id: null,
      });
    }
  }

  function onChange(value: string) {
    updateSearchParams({
      custodian_id: value,
    });
  }

  return {
    isLoading,
    options,
    onChange,
    custodianId,
  };
}
