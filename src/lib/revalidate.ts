import { AccessTokenKey } from "@/constants/strings";
import { Cookies } from "react-cookie";
import { mutate } from "swr";
import buildURLSearchParams from "./buildURLSearchParams";

export default function revalidate(key: string, useURLSearchParams = true) {
  return mutate([
    key +
      (useURLSearchParams ? buildURLSearchParams(window.location.search) : ""),
    new Cookies().get(AccessTokenKey),
  ]);
}
