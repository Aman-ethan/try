"use client";

import { formatPrice } from "@/lib/format";
import { InputNumberProps } from "antd";
import InputNumber from "./InputNumber";

export default function InputPrice({
  currency = "USD",
  ...props
}: InputNumberProps & { currency: string }) {
  return (
    <InputNumber
      key={currency}
      formatter={(value) =>
        currency && value ? formatPrice(value, currency) : ""
      }
      parser={(value) =>
        value ? value.replace(/([A-Z]|[a-z])*\$\s?|(,*)/g, "") : ""
      }
      {...props}
    />
  );
}
