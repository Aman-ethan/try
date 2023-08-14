import { useSessionStorage } from "@mantine/hooks";
import dayjs, { ManipulateType } from "dayjs";
import { DATE_PARAM_FORMAT } from "@/constants/format";

export default function useDateRange() {
  const [duration, setDuration] = useSessionStorage({
    key: "duration",
    defaultValue: "year" as ManipulateType,
  });

  const startDate = dayjs().subtract(1, duration).format(DATE_PARAM_FORMAT);
  const endDate = dayjs().format(DATE_PARAM_FORMAT);

  return {
    startDate,
    endDate,
    duration,
    setDuration,
  };
}
