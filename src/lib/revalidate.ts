import { mutate } from "swr";
import buildURLSearchParams from "./buildURLSearchParams";

export default function revalidate(key: string) {
  return mutate(key + buildURLSearchParams(window.location.search));
}
