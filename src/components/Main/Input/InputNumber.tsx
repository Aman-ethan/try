import { InputNumber as AntdInputNumber, InputNumberProps } from "antd";
import clsx from "clsx";

export default function InputNumber({ className, ...props }: InputNumberProps) {
  return (
    <AntdInputNumber
      className={clsx("initial:w-full initial:text-base", className)}
      min={0}
      {...props}
    />
  );
}
