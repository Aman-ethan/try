import { Radio, RadioGroupProps } from "antd";

export default function TradeAction(props: RadioGroupProps) {
  return (
    <Radio.Group {...props}>
      <Radio value="buy">Buy</Radio>
      <Radio value="sell">Sell</Radio>
    </Radio.Group>
  );
}
