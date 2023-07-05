import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectClient from "./useSelectClient";

export default function useSelectClientWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client");
  const custodianId = getSearchParams("custodian");

  const { isLoading, options } = useSelectClient({ custodianId });

  useDependentSelect({
    dependsOn: custodianId,
    dependentProps: {
      value: clientId,
      options,
      isLoading,
      reset: () => {
        updateSearchParams({
          client: null,
        });
      },
    },
  });

  function onChange(value: string) {
    updateSearchParams({
      client: value,
    });
  }

  return {
    isLoading,
    options,
    onChange,
    clientId,
  };
}
