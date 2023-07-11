import { formatQuantity } from "@/lib/format";
import { InputNumberProps } from "antd";
import InputNumber from "./InputNumber";

export default function InputQuantity({
  className,
  ...props
}: InputNumberProps) {
  return (
    <InputNumber
      formatter={(value) => (value ? formatQuantity(value) : "")}
      {...props}
    />
  );
}
