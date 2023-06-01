"use client";

import { postFetcher } from "@/lib/fetcher";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

function useMutation<ExtraArgs, Data>(
  url: string,
  options?: SWRMutationConfiguration<Data, Error, ExtraArgs, string>
) {
  return useSWRMutation<Data, Error, string, ExtraArgs>(url, postFetcher, {
    ...options,
    throwOnError: false,
  });
}

export function useAuthServerMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, ExtraArgs, string>
) {
  return useMutation<ExtraArgs, Data>(
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL! + key,
    options
  );
}

export function useTransactionServerMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, ExtraArgs, string>
) {
  return useMutation<ExtraArgs, Data>(
    process.env.NEXT_PUBLIC_TRANSACTION_SERVER_URL! + key,
    options
  );
}
