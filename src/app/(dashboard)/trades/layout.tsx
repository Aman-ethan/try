import TradeHeader from "@/components/Main/Trades/General/TradeHeader";
import { ReactNode } from "react";

interface ITradeLayoutProps {
  children: ReactNode;
}

export default function TradeLayout({ children }: ITradeLayoutProps) {
  return (
    <div className="px-12 py-6 space-y-8">
      <TradeHeader />
      <div className="bg-neutral-1 p-6 rounded-lg">{children}</div>
    </div>
  );
}
