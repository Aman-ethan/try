import { Tooltip } from "antd";
import { formatCompactNumber, formatNumber } from "@/lib/format";

type NumberFormatType = "price" | "quantity";

interface Props {
  value: number | string | undefined;
  type?: NumberFormatType;
}

export default function TooltipText({ value, type = "price" }: Props) {
  const formattedValue = formatCompactNumber(value);
  const formattedValueType = formatNumber(type, value);
  return <Tooltip title={String(formattedValueType)}>{formattedValue}</Tooltip>;
}
