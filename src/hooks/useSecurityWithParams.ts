import useSearchParams from "./useSearchParams";
import useSecurities from "./useSecurities";

export default function useSecurityWithParams() {
  const { options, isLoading } = useSecurities();
  const { get: getSearchParams, updateSearchParams } = useSearchParams();

  const security = getSearchParams("security__in");

  function onChange(value: string) {
    updateSearchParams({ security__in: value });
  }

  return {
    value: security,
    options,
    isLoading,
    onChange,
  };
}
