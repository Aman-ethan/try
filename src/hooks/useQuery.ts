"use client";

import { getFetcher } from "@/lib/fetcher";
import useSWR, { SWRConfiguration } from "swr";
import { TransactionServerUrl } from "@/constants/strings";
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
  return useQuery<Data>(key, TransactionServerUrl, config);
}

export function useTransactionServerLazyQuery<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, unknown>
) {
  return useMutation<unknown, Data>(
    key,
    getFetcher(TransactionServerUrl),
    config
  );
}
