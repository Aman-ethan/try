"use client";

import { ACCESS_TOKEN_KEY } from "@/constants/strings";
import { Cookies } from "react-cookie";

interface IFetcherParams {
  url: string;
  // eslint-disable-next-line no-undef
  init: RequestInit;
  error: string;
}

async function fetcher({ url, init, error }: IFetcherParams) {
  try {
    const accessToken = new Cookies().get(ACCESS_TOKEN_KEY);
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        ...init.headers,
      },
    });

    if (!res.ok) {
      throw new Error(error);
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(error);
    }
  }
}

export function postJsonFetcher(baseURL: string) {
  return <ExtraArgs>(key: string, options: Readonly<{ arg: ExtraArgs }>) =>
    fetcher({
      url: baseURL + key,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.arg),
      },
      error: "An error occurred while posting the data.",
    });
}

export function deleteFetcher(baseURL: string) {
  return (key: string) =>
    fetcher({
      url: baseURL + key,
      init: { method: "DELETE" },
      error: "An error occurred while deleting the data.",
    });
}

export function postFormFetcher(baseURL: string) {
  return <ExtraArgs>(key: string, options: Readonly<{ arg: ExtraArgs }>) => {
    const formData = new FormData();
    Object.entries(options.arg as Record<string, string | File>).forEach(
      ([_key, value]) => {
        formData.append(_key, value);
      }
    );
    return fetcher({
      url: baseURL + key,
      init: {
        method: "POST",
        body: formData,
      },
      error: "An error occurred while posting the data.",
    });
  };
}

export function getFetcher(baseURL: string) {
  return (key: string) =>
    fetcher({
      url: baseURL + key,
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      error: "An error occurred while getting the data.",
    });
}
