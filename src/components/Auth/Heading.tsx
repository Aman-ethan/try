import { Typography } from "@/lib/antd";
import { TitleProps } from "antd/es/typography/Title";

const DefaultTitle = (
  <>
    <span className="text-auth-blue-dark">Welcome to</span> ethan
  </>
);

export default function Heading({ children = DefaultTitle }: TitleProps) {
  return (
    <Typography.Title className="font-normal">{children}</Typography.Title>
  );
}
