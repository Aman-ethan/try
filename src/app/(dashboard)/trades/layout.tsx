import TradeHeader from "@/components/Main/Trades/General/TradeHeader";

interface ITradeLayoutProps {
  children: React.ReactNode;
}

export default function TradeLayout({ children }: ITradeLayoutProps) {
  return (
    <div className="px-12 pt-6 flex flex-col flex-1">
      <TradeHeader />
      <div className="bg-neutral-1 p-6 rounded-lg my-8 flex-1">{children}</div>
    </div>
  );
}
