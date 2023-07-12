import { DATE_PARAM_FORMAT } from "@/constants/format";
import { Dayjs } from "dayjs";

export default function formatTriggerValues(
  values: Record<string, string | number | Dayjs>
) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value instanceof Dayjs ? value.format(DATE_PARAM_FORMAT) : value,
    };
  }, {});
}
