"use client";

import { ACCESS_TOKEN_KEY } from "@/constants/strings";
import { Cookies } from "react-cookie";

export async function postFetcher<ExtraArgs>(
  key: string,
  options: Readonly<{ arg: ExtraArgs }>
) {
  try {
    const accessToken = new Cookies().get(ACCESS_TOKEN_KEY);
    const res = await fetch(key, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify(options.arg),
    });

    if (!res.ok) {
      throw new Error("An error occurred while posting the data.");
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An error has occurred while posting the data.");
    }
  }
}

export async function getFetcher([key, accessToken]: string[]) {
  try {
    const res = await fetch(key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An error occurred while fetching the data.");
    }
  }
}
