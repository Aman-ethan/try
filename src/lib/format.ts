import { format } from "d3";
import dayjs from "dayjs";

type NumberFormatType = "price" | "quantity";

const numberFormatOptions: Record<NumberFormatType, Intl.NumberFormatOptions> =
  {
    price: {
      style: "currency",
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    },
    quantity: {
      maximumFractionDigits: 20,
    },
  };

export function formatNumber(
  type: NumberFormatType,
  value?: string | number,
  options?: Intl.NumberFormatOptions
) {
  if (Number.isNaN(Number(value))) return null;
  return new Intl.NumberFormat("en-US", {
    ...numberFormatOptions[type],
    ...options,
  }).format(String(value) as unknown as number);
}

export function formatTableDate(date: Date) {
  return dayjs(date).format("D MMM YYYY");
}

const f = format("~s");

export function formatCompactNumber(num: number | string) {
  if (Number.isNaN(Number(num))) return num;
  return f(Number(num))
    .replace("k", " K")
    .replace("G", " B")
    .replace("M", " M");
}
