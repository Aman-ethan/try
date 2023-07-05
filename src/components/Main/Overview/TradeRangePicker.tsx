import dayjs, { Dayjs } from "dayjs";
import useSearchParams from "@/hooks/useSearchParams";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { RangePicker } from "../Input/DatePicker";

export default function TradeRangePicker() {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();
  const tradeDateFrom = getSearchParams("trade_date_from");
  const tradeDateTo = getSearchParams("trade_date_to");

  const onChange = (values: Dayjs[] | any) => {
    if (values) {
      updateSearchParams({
        trade_date_from: values[0].format(DATE_PARAM_FORMAT),
        trade_date_to: values[1].format(DATE_PARAM_FORMAT),
      });
    } else {
      updateSearchParams({
        trade_date_from: null,
        trade_date_to: null,
      });
    }
  };

  const disabledDate = (current: Dayjs) => {
    return current < dayjs().subtract(1, "M") || current > dayjs();
  };

  const isRangeSelected = tradeDateFrom && tradeDateTo;
  return (
    <RangePicker
      onChange={onChange}
      defaultValue={
        isRangeSelected ? [dayjs(tradeDateFrom), dayjs(tradeDateTo)] : undefined
      }
      disabledDate={disabledDate}
    />
  );
}
