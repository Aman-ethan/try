"use client";

import { getFetcher } from "@/lib/fetcher";
import useSWR, { SWRConfiguration } from "swr";
import { TRANSACTION_SERVER_URL } from "@/constants/strings";
import { SWRMutationConfiguration } from "swr/mutation";
import useMutation from "./useMutation";

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

export function useTransactionServerLazyQuery<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, unknown>
) {
  return useMutation<unknown, Data>(
    key,
    getFetcher(TRANSACTION_SERVER_URL),
    config
  );
}
