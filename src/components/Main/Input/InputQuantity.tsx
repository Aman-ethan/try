import { InputNumberProps } from "antd";
import { formatQuantity } from "@/lib/format";
import InputNumber from "./InputNumber";

export default function InputQuantity(props: InputNumberProps) {
  return (
    <InputNumber
      formatter={(value) => (value ? formatQuantity(value) : "")}
      {...props}
    />
  );
}
