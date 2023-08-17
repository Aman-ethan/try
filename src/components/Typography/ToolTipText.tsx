import { Tooltip } from "antd";
import { formatCompactNumber, formatNumber } from "@/lib/format";

interface Props {
  value: number | string | undefined;
}

export default function TooltipText({ value }: Props) {
  const formattedValue = formatCompactNumber(value);
  const formattedValueType = formatNumber("quantity", value);
  return <Tooltip title={String(formattedValueType)}>{formattedValue}</Tooltip>;
}
