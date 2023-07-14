import { SearchParams } from "@/interfaces/Main";
import {
  usePathname,
  useSearchParams as useNextSearchParams,
  useRouter,
} from "next/navigation";

export type IUpdateSearchParams = Partial<
  Record<SearchParams, string | number | null>
>;

export default function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  function updateSearchParams(params: IUpdateSearchParams) {
    const urlSearchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value != null) urlSearchParams.append(key, String(value));
    });

    searchParams.forEach((value, key) => {
      if (!Object.keys(params).includes(key)) {
        urlSearchParams.append(key, value);
      }
    });

    urlSearchParams.sort();
    router.push(`${pathname}?${urlSearchParams}`);
  }

  function get(name: SearchParams) {
    return searchParams.get(name) ?? undefined;
  }

  return { get, updateSearchParams };
}
