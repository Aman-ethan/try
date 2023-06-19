import {
  usePathname,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { useRouter } from "next/navigation";

type AuthSearchParams =
  | "username"
  | "password"
  | "phone_number"
  | "user_id"
  | "next_path";

type NetWorthSearchParams = "client_id" | "client_name";

type TradeSearchParams =
  | "trade_search"
  | "trade_client_id"
  | "trade_custodian_id"
  | "trade_date_from"
  | "trade_date_to"
  | "trade_limit"
  | "trade_offset"
  | "trade_ordering";

export type SearchParams =
  | AuthSearchParams
  | NetWorthSearchParams
  | TradeSearchParams
  | "selected_date"
  | "selected_duration";

export type IUpdateSearchParams = Partial<
  Record<SearchParams, string | number | null>
>;

export default function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  function updateSearchParams(params: IUpdateSearchParams) {
    const urlSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== null) urlSearchParams.append(key, String(value));
    }

    for (const [key, value] of searchParams) {
      if (!Object.keys(params).includes(key)) {
        urlSearchParams.append(key, value);
      }
    }
    urlSearchParams.sort();
    router.push(pathname + "?" + urlSearchParams);
  }

  function get(name: SearchParams) {
    return searchParams.get(name);
  }

  return { get, updateSearchParams };
}
