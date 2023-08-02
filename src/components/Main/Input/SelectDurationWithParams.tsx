import { ArrowRightOutlined } from "@ant-design/icons";
import { useSessionStorage } from "@mantine/hooks";
import { Popover } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { useToken } from "@/lib/antd";
import { IDateRange, SearchParams } from "@/interfaces/Main";
import useSearchParams from "@/hooks/useSearchParams";
import { DATE_DISPLAY_FORMAT, DATE_PARAM_FORMAT } from "@/constants/format";
import Select from "@/components/Input/Select";
import { useTransactionServerQuery } from "@/hooks/useQuery";

dayjs.extend(quarterOfYear);

type TDurationValue = ManipulateType | QUnitType | "all";
interface IDuration {
  label: string;
  value: TDurationValue;
}

interface IPopoverContentProps {
  startDate?: string;
  endDate?: string;
}

const DURATION: IDuration[] = [
  { label: "All", value: "all" },
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
    default:
      return ["start_date", "end_date"];
  }
}

function useDurationWithParams() {
  const { data: dateRange, isLoading } = useTransactionServerQuery<IDateRange>(
    "/position/history/date/"
  );
  const { get: getSearchParams, updateSearchParams } = useSearchParams();
  const layoutSegment = useSelectedLayoutSegment();
  const [duration, setDuration] = useSessionStorage({
    key: "duration",
    defaultValue: "all" as TDurationValue,
  });

  const [startDateKey, endDateKey] = getDateKeys(layoutSegment);
  const startDate = getSearchParams(startDateKey);
  const endDate = getSearchParams(endDateKey);

  const onChange = useCallback(
    (value: ManipulateType | "all") => {
      setDuration(value);
      if (value === "all") {
        updateSearchParams({
          [startDateKey]: dateRange?.start_date,
          [endDateKey]: dateRange?.end_date,
        });
        return;
      }
      updateSearchParams({
        [startDateKey]: dayjs().subtract(1, value).format(DATE_PARAM_FORMAT),
        [endDateKey]: dayjs().format(DATE_PARAM_FORMAT),
      });
    },
    [dateRange, endDateKey, startDateKey, setDuration, updateSearchParams]
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
    loading: isLoading,
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
  const { onChange, startDate, endDate, value, loading } =
    useDurationWithParams();
  const [visible, setVisible] = useState(false);
  const { token } = useToken();
  return (
    <Popover
      open={visible || value === "all" ? false : undefined}
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
        loading={loading}
      />
    </Popover>
  );
}
