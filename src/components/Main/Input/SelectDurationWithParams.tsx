import Select from "@/components/Input/Select";
import { DATE_DISPLAY_FORMAT, DATE_PARAM_FORMAT } from "@/constants/format";
import useSearchParams from "@/hooks/useSearchParams";
import { SearchParams } from "@/interfaces/Main";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useSessionStorage } from "@mantine/hooks";
import { Popover } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import { useSelectedLayoutSegment } from "next/navigation";

interface IDuration {
  label: string;
  value: ManipulateType | QUnitType;
}

interface IPopoverContentProps {
  startDate?: string;
  endDate?: string;
}

const DURATION: IDuration[] = [
  { label: "Week", value: "w" },
  { label: "Month", value: "M" },
  { label: "Quarter", value: "Q" },
  { label: "Year", value: "y" },
];

function getDateKeys(layoutSegment: string | null): SearchParams[] {
  switch (layoutSegment) {
    case "":
    default:
      return ["start_date", "end_date"];
  }
}

function useDurationWithParams() {
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const layoutSegment = useSelectedLayoutSegment();
  const [duration, setDuration] = useSessionStorage({
    key: "duration",
    defaultValue: "w",
  });

  const [startDateKey, endDateKey] = getDateKeys(layoutSegment);
  const startDate = getSearchParams(startDateKey);
  const endDate = getSearchParams(endDateKey);

  function onChange(value: ManipulateType) {
    setDuration(value);
    updateSearchParams({
      [startDateKey]: dayjs().subtract(1, value).format(DATE_PARAM_FORMAT),
      [endDateKey]: dayjs().format(DATE_PARAM_FORMAT),
    });
  }

  if (!(startDate && endDate)) {
    onChange("w");
  }

  return {
    startDate,
    endDate,
    onChange,
    defaultValue: duration,
  };
}

function PopoverContent({ startDate, endDate }: IPopoverContentProps) {
  return (
    <div className="flex gap-x-2">
      {dayjs(startDate).format(DATE_DISPLAY_FORMAT)}
      <ArrowRightOutlined />
      {dayjs(endDate).format(DATE_DISPLAY_FORMAT)}
    </div>
  );
}

export default function SelectDurationWithParams() {
  const { onChange, startDate, endDate, defaultValue } =
    useDurationWithParams();
  return (
    <Popover
      className="p-2 bg-primary-6"
      content={<PopoverContent startDate={startDate} endDate={endDate} />}
    >
      <Select
        defaultValue={defaultValue}
        onChange={onChange}
        options={DURATION}
      />
    </Popover>
  );
}
