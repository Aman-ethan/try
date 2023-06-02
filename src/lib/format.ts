type NumberFormatType = "price" | "assetsQuantity";

const numberFormatOptions: Record<NumberFormatType, Intl.NumberFormatOptions> =
  {
    price: {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 4,
      maximumSignificantDigits: 10,
    },
    assetsQuantity: {
      maximumFractionDigits: 20,
      maximumSignificantDigits: 10,
    },
  };

export function formatNumber(type: NumberFormatType, value: string | number) {
  return new Intl.NumberFormat("en-US", numberFormatOptions[type]).format(
    String(value) as unknown as number
  );
}

export const dateFormat = "DD-MM-YYYY";
