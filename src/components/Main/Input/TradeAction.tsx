import { Radio } from "antd";

export default function TradeAction() {
  return (
    <Radio.Group>
      <Radio value="buy">Buy</Radio>
      <Radio value="sell">Sell</Radio>
    </Radio.Group>
  );
}
