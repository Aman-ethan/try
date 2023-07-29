"use client";

import {
  AccessTokenKey,
  AnalyticsServerUrl,
  TransactionServerUrl,
} from "@/constants/strings";
import { SearchParams } from "@/interfaces/Main";
import { getFetcher, postJsonFetcher } from "@/lib/fetcher";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfiguration } from "swr";
import { SWRMutationConfiguration } from "swr/mutation";
import useMutation from "./useMutation";

type TKey = string | [string, Record<string, string>] | null;

function formatKey(key: TKey, access_token: string) {
  if (key) {
    if (Array.isArray(key)) {
      return [...key, access_token];
    }
    return [key, access_token];
  }
  return null;
}

function useQuery<Data>(
  key: TKey,
  fetcher: (
    _key: string,
    _options?: { arg: Record<string, string> }
  ) => Promise<Data>,
  config?: SWRConfiguration<Data, Error>
) {
  const { access_token } = useCookies([AccessTokenKey])[0];

  return useSWR<Data, Error>(formatKey(key, access_token), fetcher, {
    keepPreviousData: true,
    ...config,
  });
}

export function useTransactionServerQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(key, getFetcher(TransactionServerUrl), config);
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

export function useAnalyticsServerQuery<Data>(
  key: string | null,
  args: Partial<Record<SearchParams, string>>,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(
    key ? [key, args] : null,
    postJsonFetcher(AnalyticsServerUrl),
    config
  );
}

export function useAnalyticsServerGetQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(key, getFetcher(AnalyticsServerUrl), config);
}
