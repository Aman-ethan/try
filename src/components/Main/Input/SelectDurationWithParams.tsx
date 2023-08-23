import React, { useCallback, useLayoutEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Divider, Popover } from "antd";
import dayjs, { Dayjs, ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { useSelectedLayoutSegments } from "next/navigation";
import clsx from "clsx";
import { useToken } from "@/lib/antd";
import { SearchParams } from "@/interfaces/Main";
import useSearchParams from "@/hooks/useSearchParams";
import {
  DATE_DISPLAY_FORMAT,
  DATE_DISPLAY_FORMAT_POPOVER,
  DATE_PARAM_FORMAT,
} from "@/constants/format";
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

interface IPopoverContentDatepickerProps {
  endDate?: string;
}

const DURATION: IDuration[] = [
  { label: "All", value: "year" },
  { label: "Weekly", value: "w" },
  { label: "Monthly", value: "M" },
  { label: "Quarterly", value: "Q" },
  { label: "Yearly", value: "y" },
  { label: "Daily", value: "d" },
];

function getDateKeys(layoutSegments: string[] | null): SearchParams[] {
  switch (true) {
    case layoutSegments?.includes("transaction"):
    case layoutSegments?.includes("trades"):
    case layoutSegments?.includes("vaultZ"):
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

  const [startDateKey, endDateKey] = getDateKeys(layoutSegments);
  const {
    startDate,
    endDate,
    duration,
    setDuration,
    setEndDate,
    setStartDate,
  } = useDateRange();

  const handleDateChange = useCallback(
    (value: Dayjs | ManipulateType | null) => {
      if (startDateKey && endDateKey) {
        let updatedStartDate = startDate;
        let updatedEndDate = endDate;

        if (!dayjs.isDayjs(value)) {
          setDuration(value as ManipulateType);
          updatedStartDate = dayjs(endDate)
            .subtract(1, value as ManipulateType)
            .format(DATE_PARAM_FORMAT);
        } else {
          updatedEndDate = dayjs(value).format(DATE_PARAM_FORMAT);
        }

        updateSearchParams({
          [startDateKey]: updatedStartDate,
          [endDateKey]: updatedEndDate,
        });
        setStartDate(updatedStartDate);
        setEndDate(updatedEndDate);
      }
    },
    [
      endDateKey,
      startDateKey,
      setDuration,
      updateSearchParams,
      startDate,
      endDate,
      setStartDate,
      setEndDate,
    ]
  );

  useLayoutEffect(() => {
    handleDateChange(dayjs.isDayjs(duration) ? dayjs(duration) : duration);
  }, [duration, handleDateChange]);

  return {
    startDate,
    endDate,
    handleDateChange,
    value: duration,
    disabled: !startDateKey && !endDateKey,
  };
}

function PopoverContentForDatePicker({
  endDate,
}: IPopoverContentDatepickerProps) {
  return (
    <div className="flex gap-x-2 text-white">
      <p>
        Showing data until {dayjs(endDate).format(DATE_DISPLAY_FORMAT_POPOVER)}
      </p>
    </div>
  );
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
        className="mb-2 flex justify-between rounded-md p-2 text-black tab:hidden"
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
  const { handleDateChange, startDate, endDate, value, disabled } =
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
      onChange={handleDateChange}
      popupMatchSelectWidth={false}
      placement={MOBILE_BREAK_POINT ? "bottomRight" : "bottomLeft"}
      dropdownRender={(menu) =>
        renderDropdown(menu, startDate, endDate, token.colorPrimaryBg)
      }
      options={DURATION}
    />
  );
  const datePickerWrapperClasses = clsx(MOBILE_BREAK_POINT ? "w-1/2 pr-2" : "");
  const parentDivClasses = clsx(
    "flex",
    MOBILE_BREAK_POINT
      ? "w-full flex-row items-center"
      : "items-center gap-x-2 desk:gap-x-3"
  );
  return (
    <div className={parentDivClasses}>
      <div className={datePickerWrapperClasses}>
        <Popover
          className="min-w-full"
          content={<PopoverContentForDatePicker endDate={endDate} />}
          color={token.blue6}
        >
          <DatePicker
            size="middle"
            className="selected-date max-w-[8rem]"
            style={{ backgroundColor: token.colorPrimaryBg }}
            defaultValue={dayjs(endDate)}
            onChange={handleDateChange}
            allowClear={false}
            format={DATE_DISPLAY_FORMAT}
          />
        </Popover>
      </div>

      {MOBILE_BREAK_POINT ? (
        <div className="w-1/2 pl-2">{content}</div>
      ) : (
        <>
          <Divider type="vertical" className="text-neutral-13/5" />
          <div>
            <Popover
              open={visible || value === "year" ? false : undefined}
              className="min-w-full"
              content={
                <PopoverContent startDate={startDate} endDate={endDate} />
              }
              color={token.blue6}
            >
              {content}
            </Popover>
          </div>
        </>
      )}
    </div>
  );
}
