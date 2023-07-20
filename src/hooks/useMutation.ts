"use client";

import { AuthServerUrl, TransactionServerUrl } from "@/constants/strings";
import {
  deleteFetcher,
  patchFetcher,
  postFormFetcher,
  postJsonFetcher,
  putFetcher,
} from "@/lib/fetcher";
import { message } from "antd";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export default function useMutation<ExtraArgs, Data>(
  key: string,
  fetcher: (_key: string, _options?: { arg: ExtraArgs }) => Promise<Data>,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useSWRMutation<Data, Error, string, ExtraArgs>(key, fetcher, {
    onError(error) {
      message.error(error.message);
    },
    throwOnError: false,
    ...config,
  });
}

export function useAuthServerMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(AuthServerUrl),
    config
  );
}

export function useAuthServerPutMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(key, putFetcher(AuthServerUrl), config);
}

export function useTransactionServerFormMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postFormFetcher(TransactionServerUrl),
    config
  );
}

export function useTransactionServerMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(TransactionServerUrl),
    config
  );
}

export function useTransactionServerDeleteMutation<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    deleteFetcher(TransactionServerUrl),
    config
  );
}

export function useTransactionServerPutMutation<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    putFetcher(TransactionServerUrl),
    config
  );
}

export function useTransactionServerPatchMutation<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    patchFetcher(TransactionServerUrl),
    config
  );
}
