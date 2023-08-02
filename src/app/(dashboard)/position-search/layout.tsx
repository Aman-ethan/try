import { ReactNode } from "react";

interface IPositionLayoutProps {
  children: ReactNode;
}

export default function PositionLayout({ children }: IPositionLayoutProps) {
  return <div className="space-y-8">{children}</div>;
}
