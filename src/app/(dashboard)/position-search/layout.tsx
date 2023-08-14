import { ReactNode } from "react";

interface IPositionLayoutProps {
  children: ReactNode;
}

export default function PositionLayout({ children }: IPositionLayoutProps) {
  return (
    <div className="space-y-4 tab:space-y-6 lap:space-y-8">{children}</div>
  );
}
