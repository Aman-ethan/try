import { preload } from "swr";
import { TransactionServerUrl } from "@/constants/strings";
import { getFetcher } from "./fetcher";

export function preloadTransactionServerQuery(key: string[]) {
  preload([key], getFetcher(TransactionServerUrl));
}

export function preloadAnalyticsServerQuery() {}
