import React from "react";
import ClientHeader from "@/components/Main/ClientInformation/ClientHeader";

interface IClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: IClientLayoutProps) {
  return (
    <div className="space-y-4 tab:space-y-6">
      <ClientHeader />
      {children}
    </div>
  );
}
