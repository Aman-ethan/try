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

function useQuery<Data>(
  key: string | [string, Record<string, string>] | null,
  fetcher: (
    _key: string,
    _options?: { arg: Record<string, string> }
  ) => Promise<Data>,
  config?: SWRConfiguration<Data, Error>
) {
  const { access_token } = useCookies([AccessTokenKey])[0];
  return useSWR<Data, Error>(
    key
      ? Array.isArray(key)
        ? [...key, access_token]
        : [key, access_token]
      : null,
    fetcher,
    {
      keepPreviousData: true,
      ...config,
    }
  );
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
  key: string,
  args: Partial<Record<SearchParams, string>>,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(
    [key, args],
    postJsonFetcher(AnalyticsServerUrl),
    config
  );
}
