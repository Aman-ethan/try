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
  value: string | number,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat("en-US", {
    ...numberFormatOptions[type],
    ...options,
  }).format(String(value) as unknown as number);
}

export function formatTableDate(date: Date) {
  return dayjs(date).format("D MMM YYYY");
}
