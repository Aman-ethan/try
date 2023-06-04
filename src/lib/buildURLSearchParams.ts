import { isString, pickBy } from "lodash";

export default function buildURLSearchParams(
  params: Record<string, string | null>
) {
  return new URLSearchParams(pickBy(params, isString)).toString();
}
