"use client";

import { getFetcher } from "@/lib/fetcher";
import useSWR, { SWRConfiguration } from "swr";
import { TRANSACTION_SERVER_URL } from "@/constants/strings";

function useQuery<Data>(
  key: string | null,
  baseURL: string,
  config?: SWRConfiguration<Data, Error>
) {
  return useSWR<Data, Error>(key, getFetcher(baseURL), config);
}

export function useTransactionServerQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(key, TRANSACTION_SERVER_URL, config);
}

export function useAnalyticsServerQuery() {}
