import TradeHeader from "@/components/Main/T+1/General/TradeHeader";
import { ReactNode } from "react";

interface ITradeLayoutProps {
  children: ReactNode;
}

export default function TradeLayout({ children }: ITradeLayoutProps) {
  return (
    <div className="space-y-8">
      <TradeHeader />
      <div className="rounded-lg bg-neutral-1 p-6">{children}</div>
    </div>
  );
}
