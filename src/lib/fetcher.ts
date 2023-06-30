"use client";

export async function postFetcher<ExtraArgs>(
  key: string,
  options: Readonly<{ arg: ExtraArgs }>
) {
  try {
    const accessToken = "6e51548cebfc07b7531c540ebe5fbe18fbf00beb";
    const res = await fetch(key, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Token ${accessToken}` : "",
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
        Authorization: accessToken ? `Token ${accessToken}` : "",
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
