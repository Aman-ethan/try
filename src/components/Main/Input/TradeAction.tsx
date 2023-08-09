import { Radio, RadioGroupProps } from "antd";
import clsx from "clsx";

export default function TradeAction({ className, ...props }: RadioGroupProps) {
  return (
    <Radio.Group className={clsx("space-x-3 pt-1", className)} {...props}>
      <Radio value="buy">Buy</Radio>
      <Radio value="sell">Sell</Radio>
    </Radio.Group>
  );
}
