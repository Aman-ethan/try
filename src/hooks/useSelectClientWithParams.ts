import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectClient from "./useSelectClient";

export default function useSelectClientWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client_id");
  const custodianId = getSearchParams("custodian_id");

  const { isLoading, options } = useSelectClient({ custodianId });

  useDependentSelect({
    dependsOn: custodianId,
    dependentProps: {
      value: clientId,
      options,
      isLoading,
      reset: () => {
        updateSearchParams({
          client_id: null,
        });
      },
    },
  });

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
