import { mutate } from "swr";
import buildURLSearchParams from "./buildURLSearchParams";

export default function revalidate(key: string, useURLSearchParams = true) {
  return mutate(
    key +
      buildURLSearchParams(
        useURLSearchParams ? window.location.search : undefined
      )
  );
}
