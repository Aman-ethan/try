import React from "react";
import CrudeHeader from "@/components/Main/CrudeAnalytics/General/CrudeHeader";

interface IAnalyticsLayoutProps {
  children: React.ReactNode;
}

export default function AnalyticsLayout({ children }: IAnalyticsLayoutProps) {
  return (
    <div className="space-y-8">
      <CrudeHeader />
      {children}
    </div>
  );
}
