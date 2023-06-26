import { Cookies } from "react-cookie";
import { preload } from "swr";
import { ACCESS_TOKEN_KEY, TRANSACTION_SERVER_URL } from "@/constants/strings";
import { getFetcher } from "./fetcher";

export function preloadTransactionServerQuery(key: string) {
  const cookies = new Cookies();
  preload(
    [TRANSACTION_SERVER_URL + key, cookies.get(ACCESS_TOKEN_KEY)],
    getFetcher
  );
}

export function preloadAnalyticsServerQuery() {}
