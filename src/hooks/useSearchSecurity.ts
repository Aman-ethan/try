import useSearchParams from "./useSearchParams";

export default function useSearchSecurity() {
  const { updateSearchParams } = useSearchParams();

  function onSearch(value: string) {
    if (!value) updateSearchParams({ search: undefined });
    else updateSearchParams({ search: value });
  }

  return { onSearch };
}
