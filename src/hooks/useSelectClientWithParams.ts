import usePrevious from "./usePrevious";
import useSearchParams from "./useSearchParams";
import useSelectClient from "./useSelectClient";

export default function useSelectClientWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client_id");
  const custodianId = getSearchParams("custodian_id");

  const { isLoading, options } = useSelectClient(custodianId);

  const { isEqual } = usePrevious({ value: custodianId, update: !isLoading });

  if (!isEqual) {
    if (!options?.find(({ value }) => value === clientId)) {
      updateSearchParams({
        client_id: null,
      });
    }
  }

  function onChange(value: string) {
    updateSearchParams({
      client_id: value,
    });
  }

  return {
    isLoading,
    options,
    onChange,
    clientId,
  };
}
