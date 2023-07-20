"use client";

import { TRANSACTION_SERVER_URL } from "@/constants/strings";
import {
  deleteFetcher,
  postFormFetcher,
  postJsonFetcher,
  putFetcher,
  patchFetcher,
} from "@/lib/fetcher";
import { message } from "antd";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export default function useMutation<ExtraArgs, Data>(
  key: string,
  fetcher: (_key: string, _options?: { arg: ExtraArgs }) => Promise<Data>,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useSWRMutation<Data, Error, string, ExtraArgs>(key, fetcher, {
    ...config,
    throwOnError: false,
  });
}

export function useAuthServerMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(process.env.NEXT_PUBLIC_AUTH_SERVER_URL!),
    {
      onError(error) {
        message.error(error.message);
      },
      ...config,
    }
  );
}

export function useAuthServerPutMutation<ExtraArgs, Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    putFetcher(process.env.NEXT_PUBLIC_AUTH_SERVER_URL!),
    options
  );
}

export function useTransactionServerFormMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postFormFetcher(TRANSACTION_SERVER_URL),
    config
  );
}

export function useTransactionServerMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
  return useMutation<ExtraArgs, Data>(
    key,
    postJsonFetcher(TRANSACTION_SERVER_URL),
    config
  );
}

export function useTransactionServerDeleteMutation<Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    deleteFetcher(TRANSACTION_SERVER_URL),
    config
  );
}

export function useTransactionServerPutMutation<Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    putFetcher(TRANSACTION_SERVER_URL),
    options
  );
}

export function useTransactionServerPatchMutation<Data>(
  key: string,
  options?: SWRMutationConfiguration<Data, Error, string>
) {
  return useMutation<unknown, Data>(
    key,
    patchFetcher(TRANSACTION_SERVER_URL),
    options
  );
}
