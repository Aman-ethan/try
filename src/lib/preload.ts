import { TransactionServerUrl } from "@/constants/strings";
import { preload } from "swr";
import { getFetcher } from "./fetcher";

export function preloadTransactionServerQuery(key: string[]) {
  preload([key], getFetcher(TransactionServerUrl));
}

export function preloadAnalyticsServerQuery() {}
