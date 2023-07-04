import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectCustodian from "./useSelectCustodian";

export default function useSelectCustodianWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const clientId = getSearchParams("client_id");
  const custodianId = getSearchParams("custodian_id");

  const { options, isLoading } = useSelectCustodian({ clientId });

  useDependentSelect({
    dependsOn: clientId,
    dependentProps: {
      value: custodianId,
      options,
      isLoading,
      reset: () => {
        updateSearchParams({
          custodian_id: null,
        });
      },
    },
  });

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
