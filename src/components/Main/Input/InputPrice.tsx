"use client";

import { InputNumberProps } from "antd";
import { formatPrice } from "@/lib/format";
import InputNumber from "./InputNumber";

export default function InputPrice({
  currency = "USD",
  ...props
}: InputNumberProps & { currency: string }) {
  return (
    <InputNumber
      key={currency}
      formatter={(value) => (currency && value ? formatPrice(value) : "")}
      parser={(value) => (value ? value.replace(/[^0-9.]/g, "") : "")}
      {...props}
    />
  );
}
