import { mutate } from "swr";
import buildURLSearchParams from "./buildURLSearchParams";

export default function revalidate(key: string) {
  mutate(key + buildURLSearchParams(window.location.search));
}
