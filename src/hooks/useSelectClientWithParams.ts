import { SearchParams } from "@/interfaces/Main";
import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectClient from "./useSelectClient";

interface IUseSelectClientWithParams {
  searchParamKey?: SearchParams;
}

export default function useSelectClientWithParams(
  params?: IUseSelectClientWithParams
) {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const searchParamKey = params?.searchParamKey || "client";
  const clientId = getSearchParams(searchParamKey);
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
      [searchParamKey]: value,
    });
  }

  return {
    isLoading,
    options,
    onChange,
    clientId,
    getSearchParams,
    updateSearchParams,
  };
}
