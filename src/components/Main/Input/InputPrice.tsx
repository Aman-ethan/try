import { formatPrice } from "@/lib/format";
import { InputNumberProps } from "antd";
import clsx from "clsx";
import InputNumber from "./InputNumber";

export default function InputPrice({
  currency,
  className,
  ...props
}: InputNumberProps & Partial<{ currency: string }>) {
  return (
    <InputNumber
      formatter={(value) =>
        value ? formatPrice(value, currency || "USD") : ""
      }
      {...props}
    />
  );
}
