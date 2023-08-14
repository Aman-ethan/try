import React, { useCallback, useLayoutEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Divider, Popover } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { useSelectedLayoutSegments } from "next/navigation";
import { useToken } from "@/lib/antd";
import { SearchParams } from "@/interfaces/Main";
import useSearchParams from "@/hooks/useSearchParams";
import { DATE_DISPLAY_FORMAT, DATE_PARAM_FORMAT } from "@/constants/format";
import Select from "@/components/Input/Select";
import useDateRange from "@/hooks/useDateRange";
import { DatePicker } from "./DatePicker";

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
  const { updateSearchParams } = useSearchParams();
  const layoutSegments = useSelectedLayoutSegments();
  const { startDate, endDate, duration, setDuration } = useDateRange();

  const [startDateKey, endDateKey] = getDateKeys(layoutSegments);

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
function renderDropdown(
  menu: React.ReactElement,
  start_date: string | undefined,
  end_date: string | undefined,
  color: string | undefined
) {
  return (
    <div className="w-[12rem]">
      <div
        className="mb-2 flex justify-between rounded-md p-2 text-black"
        style={{ backgroundColor: color }}
      >
        <p className="text-xs">
          {dayjs(start_date).format(DATE_DISPLAY_FORMAT)}
        </p>
        <ArrowRightOutlined />
        <p className="text-xs">{dayjs(end_date).format(DATE_DISPLAY_FORMAT)}</p>
      </div>
      {menu}
    </div>
  );
}

export default function SelectDurationWithParams() {
  const { onChange, startDate, endDate, value, disabled } =
    useDurationWithParams();
  const [visible, setVisible] = useState(false);
  const { token } = useToken();
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 639px)");
  const content = (
    <Select
      className="w-full pr-0 tab:w-24 lap:w-28"
      onDropdownVisibleChange={setVisible}
      disabled={disabled}
      allowClear={false}
      showSearch={false}
      size="middle"
      value={value}
      onChange={onChange}
      popupMatchSelectWidth={false}
      dropdownRender={(menu) =>
        renderDropdown(menu, startDate, endDate, token.colorPrimaryBg)
      }
      options={DURATION}
    />
  );

  if (MOBILE_BREAK_POINT) {
    return (
      <div className="flex w-full flex-row items-center">
        <div className="w-1/2 pr-2">
          <DatePicker
            size="middle"
            className="max-w-[8rem]"
            style={{ backgroundColor: token.colorPrimaryBg }}
          />
        </div>
        <div className="w-1/2 pl-2">{content}</div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-x-2 desk:gap-x-3">
      <div>
        <DatePicker
          size="middle"
          className="max-w-[8rem]"
          style={{ backgroundColor: token.colorPrimaryBg }}
        />
      </div>
      <Divider type="vertical" className="text-neutral-13/5" />
      <div>
        <Popover
          open={visible || value === "year" ? false : undefined}
          className="min-w-full"
          content={<PopoverContent startDate={startDate} endDate={endDate} />}
          color={token.blue6}
        >
          {content}
        </Popover>
      </div>
    </div>
  );
}
