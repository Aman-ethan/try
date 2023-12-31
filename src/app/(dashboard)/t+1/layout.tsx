import { ReactNode } from "react";
import TradeHeader from "@/components/Main/T+1/General/TradeHeader";

interface ITradeLayoutProps {
  children: ReactNode;
}

export default function TradeLayout({ children }: ITradeLayoutProps) {
  return (
    <div className="space-y-6 lap:space-y-8">
      <TradeHeader />
      <div className="rounded-lg bg-neutral-1 p-6 shadow-large">{children}</div>
    </div>
  );
}
