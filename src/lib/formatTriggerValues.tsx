import { Dayjs, isDayjs } from "dayjs";
import { DATE_PARAM_FORMAT } from "@/constants/format";

export default function formatTriggerValues(
  values: Record<
    string,
    string | number | Dayjs | Record<string, string | string[]>
  >
) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: isDayjs(value) ? value.format(DATE_PARAM_FORMAT) : value,
    };
  }, {});
}
