import { Tooltip } from "antd";

interface IClampedTextProps {
  text: string;
}

export default function ClampedText({ text }: IClampedTextProps) {
  return (
    <Tooltip title={text}>
      <p className="line-clamp-2">{text}</p>
    </Tooltip>
  );
}
