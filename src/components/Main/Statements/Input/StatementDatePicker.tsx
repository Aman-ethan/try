"use client";

import useSearchParams from "@/hooks/useSearchParams";
import dayjs, { Dayjs } from "dayjs";
import {
  DATE_PARAM_FORMAT,
  STATEMENT_DATE_FILTER_FORMAT,
} from "@/constants/format";
import { DatePicker } from "../../Input/DatePicker";

function useStatementDatePicker() {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();

  const statementDate = getSearchParams("statement_date__gte");

  function onChange(date: Dayjs | null) {
    if (date) {
      updateSearchParams({
        statement_date__gte: date.startOf("month").format(DATE_PARAM_FORMAT),
        statement_date__lte: date.endOf("month").format(DATE_PARAM_FORMAT),
      });
    } else {
      updateSearchParams({
        statement_date__gte: null,
        statement_date__lte: null,
      });
    }
  }

  return {
    onChange,
    value: statementDate ? dayjs(statementDate) : undefined,
  };
}

export default function StatementDatePicker() {
  const { onChange, value } = useStatementDatePicker();

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      format={STATEMENT_DATE_FILTER_FORMAT}
      placeholder="Report Month"
      picker="month"
    />
  );
}
