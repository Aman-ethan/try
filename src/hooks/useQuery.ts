"use client";

import { getFetcher } from "@/lib/fetcher";
import useSWR, { SWRConfiguration } from "swr";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN_KEY, TRANSACTION_SERVER_URL } from "@/constants/strings";

function useQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  const { access_token } = useCookies([ACCESS_TOKEN_KEY])[0];
  return useSWR<Data, Error>(
    key ? [key, "6e51548cebfc07b7531c540ebe5fbe18fbf00beb"] : null,
    getFetcher,
    {
      ...config,
    }
  );
}

export function useTransactionServerQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(key ? TRANSACTION_SERVER_URL + key : null, config);
}

export function useAnalyticsServerQuery() {}
