"use client";

import React from "react";
import ClientHeader from "@/components/Main/ClientInformation/ClientHeader";
import { ClientBreadCrumb } from "@/context/ClientContext";

interface IClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: IClientLayoutProps) {
  const [breadItems, setBreadItems] = React.useState<string>("");

  const breadCrumValue = React.useMemo(
    () => ({ breadItems, setBreadItems }),
    [breadItems]
  );

  return (
    <div className="space-y-8">
      <ClientBreadCrumb.Provider value={breadCrumValue}>
        <ClientHeader />
        {children}
      </ClientBreadCrumb.Provider>
    </div>
  );
}
