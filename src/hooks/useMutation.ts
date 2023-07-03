"use client";

import { TRANSACTION_SERVER_URL } from "@/constants/strings";
import { deleteFetcher, postFormFetcher, postJsonFetcher } from "@/lib/fetcher";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

function useMutation<ExtraArgs, Data>(
  key: string,
  fetcher: (_key: string, _options: { arg: ExtraArgs }) => Promise<Data>,
  options?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useSWRMutation<Data, Error, string, ExtraArgs>(key, fetcher, {
    ...options,
    throwOnError: false,
  });
}

export function useAuthServerMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(process.env.NEXT_PUBLIC_AUTH_SERVER_URL!),
    options
  );
}

export function useTransactionServerUploadMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postFormFetcher(TRANSACTION_SERVER_URL),
    options
  );
}

export function useTransactionServerMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(TRANSACTION_SERVER_URL),
    options
  );
}

export function useTransactionServerDeleteMutation<Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    deleteFetcher(TRANSACTION_SERVER_URL),
    options
  );
}
