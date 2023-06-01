"use client";

import { Cookies } from "react-cookie";

const cookies = new Cookies();

function getAccessToken() {
  return cookies.get("access_token");
}

export async function postFetcher<ExtraArgs>(
  key: string,
  options: Readonly<{ arg: ExtraArgs }>
) {
  const accessToken = getAccessToken();
  try {
    const res = await fetch(key, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? "Bearer " + accessToken : "",
      },
      body: JSON.stringify(options.arg),
    });

    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
}

export async function getFetcher(key: string) {
  const accessToken = getAccessToken();
  try {
    const res = await fetch(key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? "Bearer " + accessToken : "",
      },
    });

    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
}
