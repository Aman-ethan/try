import { isString, pickBy } from "lodash";

export default function buildURLSearchParams(
  params: Record<string, string | null>
) {
  const urlSearchParams = new URLSearchParams(
    pickBy(params, isString)
  ).toString();
  return urlSearchParams ? `?${urlSearchParams}` : "";
}
