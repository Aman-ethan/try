import { Typography } from "@/lib/antd";
import { TitleProps } from "antd/es/typography/Title";

const DefaultTitle = "Please enter your credentials";

export default function SubHeading({ children = DefaultTitle }: TitleProps) {
  return (
    <Typography.Title level={3} type="secondary" className="font-normal">
      {children}
    </Typography.Title>
  );
}
