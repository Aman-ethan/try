"use client";

import { AccessTokenKey, TransactionServerUrl } from "@/constants/strings";
import { getFetcher } from "@/lib/fetcher";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfiguration } from "swr";
import { SWRMutationConfiguration } from "swr/mutation";
import useMutation from "./useMutation";

function useQuery<Data>(
  key: string | null,
  baseURL: string,
  config?: SWRConfiguration<Data, Error>
) {
  const { access_token } = useCookies([AccessTokenKey])[0];
  return useSWR<Data, Error>(
    key ? [key, access_token] : null,
    getFetcher(baseURL),
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
