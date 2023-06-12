"use client";

import { getFetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { SWRConfiguration } from "swr";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN_KEY, TRANSACTION_SERVER_URL } from "@/constants/strings";

function useQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  const { access_token } = useCookies([ACCESS_TOKEN_KEY])[0];
  return useSWR<Data, Error>(key ? [key, access_token] : null, getFetcher, {
    ...config,
  });
}

export function useTransactionServerQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>
) {
  return useQuery<Data>(key ? TRANSACTION_SERVER_URL + key : null, config);
}
