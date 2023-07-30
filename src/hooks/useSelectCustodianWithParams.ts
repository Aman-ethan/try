import { SearchParams } from "@/interfaces/Main";
import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectCustodian from "./useSelectCustodian";

interface IUseSelectClientWithParams {
  searchParamKey?: SearchParams;
}

export default function useSelectCustodianWithParams(
  props?: IUseSelectClientWithParams
) {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const searchParamKey = props?.searchParamKey || "custodian";
  const clientId = getSearchParams("client");
  const custodianId = getSearchParams(searchParamKey);

  const { options, isLoading } = useSelectCustodian({ clientId });

  useDependentSelect({
    dependsOn: clientId,
    dependentProps: {
      value: custodianId,
      options,
      isLoading,
      reset: () => {
        updateSearchParams({
          [searchParamKey]: null,
        });
      },
    },
  });

  function onChange(value: string) {
    updateSearchParams({
      [searchParamKey]: value,
    });
  }

  return {
    isLoading,
    options,
    onChange,
    custodianId,
  };
}
