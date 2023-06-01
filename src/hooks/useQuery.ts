"use client";

import { getFetcher } from "@/lib/fetcher";
import useSWR, { Key } from "swr";
import { SWRConfiguration } from "swr";

function useQuery<Data>(url: Key, config?: SWRConfiguration<Data, Error>) {
  return useSWR<Data, Error>(url, getFetcher, config);
}

export function useAuthServerQuery<Data>(
  key: Key,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(process.env.NEXT_PUBLIC_AUTH_SERVER_URL! + key, config);
}

export function useTransactionServerQuery<Data>(
  key: Key,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(
    process.env.NEXT_PUBLIC_TRANSACTION_SERVER_URL! + key,
    config
  );
}
