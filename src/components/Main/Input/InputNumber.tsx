import { InputNumber as AntdInputNumber, InputNumberProps } from "antd";
import clsx from "clsx";

export default function InputNumber({ className, ...props }: InputNumberProps) {
  return (
    <AntdInputNumber
      className={clsx("initial:text-base initial:w-full", className)}
      min={0}
      {...props}
    />
  );
}
