type NumberFormatType = "price" | "assetsQuantity";

const numberFormatOptions: Record<NumberFormatType, Intl.NumberFormatOptions> =
  {
    price: {
      style: "currency",
      maximumFractionDigits: 4,
    },
    assetsQuantity: {
      maximumFractionDigits: 20,
    },
  };

export function formatNumber(
  type: NumberFormatType,
  value: string | number,
  options: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat("en-US", {
    ...numberFormatOptions[type],
    ...options,
  }).format(String(value) as unknown as number);
}
