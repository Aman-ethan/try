import dayjs, { Dayjs } from "dayjs";
import useSearchParams from "@/hooks/useSearchParams";
import { RangePicker } from "../Input/DatePicker";

export default function TradeRangePicker() {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();

  const onChange = (values: Dayjs[] | any) => {
    if (values) {
      updateSearchParams({});
    } else {
      updateSearchParams({});
    }
  };

  const disabledDate = (current: Dayjs) => {
    return current < dayjs().subtract(1, "M") || current > dayjs();
  };

  return <RangePicker onChange={onChange} disabledDate={disabledDate} />;
}
