"use client";

import { postFetcher } from "@/lib/fetcher";
import { useCookies } from "react-cookie";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

function useMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, ExtraArgs, string[]>
) {
  const { access_token } = useCookies(["access_token"])[0];
  return useSWRMutation<Data, Error, string[], ExtraArgs>(
    [key, access_token],
    postFetcher,
    {
      ...options,
      throwOnError: false,
    }
  );
}

export function useAuthServerMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, ExtraArgs, string[]>
) {
  return useMutation<ExtraArgs, Data>(
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL! + key,
    options
  );
}

export function useTransactionServerMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, ExtraArgs, string[]>
) {
  return useMutation<ExtraArgs, Data>(
    process.env.NEXT_PUBLIC_TRANSACTION_SERVER_URL! + key,
    options
  );
}
