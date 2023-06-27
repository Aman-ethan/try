import React from "react";
import CrudeHeader from "@/components/Main/CrudeAnalytics/General/CrudeHeader";

interface ITradeLayoutProps {
  children: React.ReactNode;
}

export default function TradeLayout({ children }: ITradeLayoutProps) {
  return (
    <div className="space-y-8 px-12 py-6">
      <CrudeHeader />
      <div className="rounded-lg bg-neutral-1 p-6">{children}</div>
    </div>
  );
}
