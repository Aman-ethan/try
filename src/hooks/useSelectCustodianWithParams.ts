import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectCustodian from "./useSelectCustodian";

export default function useSelectCustodianWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client") || getSearchParams("client_id");
  const custodianId = getSearchParams("custodian");

  const { options, isLoading } = useSelectCustodian({ clientId });

  useDependentSelect({
    dependsOn: clientId,
    dependentProps: {
      value: custodianId,
      options,
      isLoading,
      reset: () => {
        updateSearchParams({
          custodian: null,
        });
      },
    },
  });

  function onChange(value: string) {
    updateSearchParams({
      custodian: value,
    });
  }

  return {
    isLoading,
    options,
    onChange,
    custodianId,
  };
}
