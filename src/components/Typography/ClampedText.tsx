import { Tooltip } from "antd";
import clsx from "clsx";

interface IClampedTextProps {
  text: string;
  className?: string;
}

export default function ClampedText({ className, text }: IClampedTextProps) {
  return (
    <Tooltip title={text}>
      <p className={clsx("initial:line-clamp-2", className)}>{text}</p>
    </Tooltip>
  );
}
