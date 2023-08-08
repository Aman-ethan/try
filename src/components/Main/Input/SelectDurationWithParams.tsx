import { ArrowRightOutlined } from "@ant-design/icons";
import { useSessionStorage } from "@mantine/hooks";
import { Popover } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { useSelectedLayoutSegments } from "next/navigation";
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

function getDateKeys(layoutSegments: string[] | null): SearchParams[] {
  switch (true) {
    case layoutSegments?.includes("transaction"):
    case layoutSegments?.includes("statements"):
      return ["statement_date__gte", "statement_date__lte"];
    case layoutSegments?.includes("overview"):
    case layoutSegments?.includes("analytics"):
      return ["start_date", "end_date"];
    default:
      return [];
  }
}

function useDurationWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const layoutSegments = useSelectedLayoutSegments();
  const [duration, setDuration] = useSessionStorage({
    key: "duration",
    defaultValue: "year" as TDurationValue,
  });

  const [startDateKey, endDateKey] = getDateKeys(layoutSegments);
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
    onChange(duration as ManipulateType);
  }, [duration, onChange]);

  return {
    startDate,
    endDate,
    onChange,
    value: duration,
    disabled: !startDateKey && !endDateKey,
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
  const { onChange, startDate, endDate, value, disabled } =
    useDurationWithParams();
  const [visible, setVisible] = useState(false);
  const { token } = useToken();
  return (
    <Popover
      open={visible || value === "year" ? false : undefined}
      className="min-w-full p-2"
      content={<PopoverContent startDate={startDate} endDate={endDate} />}
      color={token.blue6}
    >
      <Select
        className="pr-0 tab:w-24 lap:w-28"
        onDropdownVisibleChange={setVisible}
        disabled={disabled}
        allowClear={false}
        showSearch={false}
        size="middle"
        value={value}
        onChange={onChange}
        options={DURATION}
      />
    </Popover>
  );
}
