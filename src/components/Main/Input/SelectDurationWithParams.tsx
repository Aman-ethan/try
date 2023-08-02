import { ArrowRightOutlined } from "@ant-design/icons";
import { useSessionStorage } from "@mantine/hooks";
import { Popover } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { useToken } from "@/lib/antd";
import { SearchParams } from "@/interfaces/Main";
import useSearchParams from "@/hooks/useSearchParams";
import { DATE_DISPLAY_FORMAT, DATE_PARAM_FORMAT } from "@/constants/format";
import Select from "@/components/Input/Select";

dayjs.extend(quarterOfYear);

type TDurationValue = ManipulateType | QUnitType;
interface IDuration {
  label: string;
  value: TDurationValue;
}

interface IPopoverContentProps {
  startDate?: string;
  endDate?: string;
}

const DURATION: IDuration[] = [
  { label: "All", value: "year" },
  { label: "Weekly", value: "w" },
  { label: "Monthly", value: "M" },
  { label: "Quarterly", value: "Q" },
  { label: "Yearly", value: "y" },
];

function getDateKeys(layoutSegment: string | null): SearchParams[] {
  switch (layoutSegment) {
    case "transaction":
    case "t+1":
    case "statements":
      return ["statement_date__gte", "statement_date__lte"];
    case "position-search":
    case "client-information":
      return [];
    default:
      return ["start_date", "end_date"];
  }
}

function useDurationWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const layoutSegment = useSelectedLayoutSegment();
  const [duration, setDuration] = useSessionStorage({
    key: "duration",
    defaultValue: "year" as TDurationValue,
  });

  const [startDateKey, endDateKey] = getDateKeys(layoutSegment);
  const startDate = getSearchParams(startDateKey);
  const endDate = getSearchParams(endDateKey);

  const onChange = useCallback(
    (value: ManipulateType) => {
      setDuration(value);
      if (startDateKey && endDateKey)
        updateSearchParams({
          [startDateKey]: dayjs().subtract(1, value).format(DATE_PARAM_FORMAT),
          [endDateKey]: dayjs().format(DATE_PARAM_FORMAT),
        });
    },
    [endDateKey, startDateKey, setDuration, updateSearchParams]
  );

  useLayoutEffect(() => {
    if (!startDate) {
      onChange(duration as ManipulateType);
    }
  }, [duration, onChange, startDate]);

  return {
    startDate,
    endDate,
    onChange,
    value: duration,
  };
}

function PopoverContent({ startDate, endDate }: IPopoverContentProps) {
  return (
    <div className="flex gap-x-2 text-white">
      {dayjs(startDate).format(DATE_DISPLAY_FORMAT)}
      <ArrowRightOutlined />
      {dayjs(endDate).format(DATE_DISPLAY_FORMAT)}
    </div>
  );
}

export default function SelectDurationWithParams() {
  const { onChange, startDate, endDate, value } = useDurationWithParams();
  const [visible, setVisible] = useState(false);
  const { token } = useToken();
  return (
    <Popover
      open={visible || value === "year" ? false : undefined}
      className="p-2"
      content={<PopoverContent startDate={startDate} endDate={endDate} />}
      color={token.blue6}
    >
      <Select
        onDropdownVisibleChange={setVisible}
        showSearch={false}
        allowClear={false}
        size="middle"
        className="w-28 pr-0"
        value={value}
        onChange={onChange}
        options={DURATION}
      />
    </Popover>
  );
}
