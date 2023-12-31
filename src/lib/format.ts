import { format } from "d3";
import dayjs from "dayjs";
import en from "dayjs/locale/en";

type NumberFormatType = "price" | "quantity";

const numberFormatOptions: Record<NumberFormatType, Intl.NumberFormatOptions> =
  {
    price: {
      // style: "currency",
      minimumFractionDigits: 0,
      // maximumFractionDigits: 4,
      maximumFractionDigits: 2,
    },
    quantity: {
      // maximumFractionDigits: 20,
      maximumFractionDigits: 10,
    },
  };

export function formatNumber(
  type: NumberFormatType,
  value?: string | number,
  options?: Intl.NumberFormatOptions
) {
  if (Number.isNaN(Number(value))) return "";
  return new Intl.NumberFormat("en-US", {
    ...numberFormatOptions[type],
    ...options,
  }).format(String(value) as unknown as number);
}

export function formatPriceWithSymbol(
  price: number | string,
  currency: string
) {
  return formatNumber("price", price, {
    style: "currency",
    currency,
  });
}

export function formatPrice(price: number | string) {
  return formatNumber("price", price);
}

export function formatQuantity(quantity: number | string) {
  return formatNumber("quantity", quantity);
}

export function formatTableDate(date: Date) {
  return dayjs(date).locale(en).format("D MMM YYYY");
}

const f = format(".5~s");

export function formatCompactNumber(num?: number | string) {
  const number = Number(num);
  if (Number.isNaN(number)) return "";

  const formattedNumber = Math.abs(number) > 1 ? f(number) : number.toString();

  return formattedNumber
    .replace(/(-*\d*\.*\d{0,2})\d*([A-Z|a-z]*)/g, "$1$2")
    .replace("k", " K")
    .replace("G", " B")
    .replace("M", " M");
}

export function formatPercentage(num?: number) {
  if (Number.isNaN(Number(num))) return "";

  // Convert num to a string with two decimal places
  const formattedNumString = typeof num === "number" ? num.toFixed(2) : "";

  return formattedNumString;
}
