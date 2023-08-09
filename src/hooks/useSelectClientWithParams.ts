import { useCallback } from "react";
import { SearchParams } from "@/interfaces/Main";
import { resetPage } from "@/constants/searchParams";
import useDependentSelect from "./useDependentSelect";
import useSearchParams from "./useSearchParams";
import useSelectClient from "./useSelectClient";

interface IUseSelectClientWithParams {
  searchParamKey?: SearchParams;
}

export default function useSelectClientWithParams(
  props?: IUseSelectClientWithParams
) {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const searchParamKey = props?.searchParamKey || "client";
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
          [searchParamKey]: null,
        });
      },
    },
  });

  const onChange = useCallback(
    (value: string) => {
      updateSearchParams({
        [searchParamKey]: value,
        ...resetPage,
      });
    },
    [searchParamKey, updateSearchParams]
  );

  const selectedClient =
    options?.find((option) => option.value === clientId) || options?.[0];

  return {
    isLoading,
    options,
    onChange,
    clientId,
    getSearchParams,
    updateSearchParams,
    selectedClient,
  };
}
