import useSearchParams from "./useSearchParams";

export default function useSearchSecurity() {
  const { updateSearchParams } = useSearchParams();

  function onSearch(value: string) {
    updateSearchParams({ search: value });
  }

  return { onSearch };
}
