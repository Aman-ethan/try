import { Cookies } from "react-cookie";
import { preload } from "swr";
import { getFetcher } from "./fetcher";
import { ACCESS_TOKEN_KEY, TRANSACTION_SERVER_URL } from "@/constants/strings";

export function preloadTransactionServerQuery(key: string) {
  const cookies = new Cookies();
  preload(
    [TRANSACTION_SERVER_URL + key, cookies.get(ACCESS_TOKEN_KEY)],
    getFetcher
  );
}
