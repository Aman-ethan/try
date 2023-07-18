import useSearchParams from "./useSearchParams";
import useSecurities from "./useSecurities";

export default function useSecurityWithParams() {
  const { options, isLoading } = useSecurities();
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
