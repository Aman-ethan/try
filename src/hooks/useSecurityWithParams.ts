import useSearchParams from "./useSearchParams";
import useSecurity from "./useSecurity";

export default function useSecurityWithParams() {
  const { options, isLoading } = useSecurity();
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const security = getSearchParams("security");

  function onChange(value: string) {
    updateSearchParams({ security: value });
  }

  return {
    defaultValue: security,
    options,
    isLoading,
    onChange,
  };
}
