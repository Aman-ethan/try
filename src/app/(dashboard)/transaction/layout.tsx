import { Breadcrumb } from "antd";
import { ReactNode } from "react";

interface ITransactionLayoutProps {
  children: ReactNode;
}

// Will be making the position list page folder dynamic with [client] after API integration so for now i have just hardcoded the nested route.

export default function TransactionLayout({
  children,
}: ITransactionLayoutProps) {
  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          {
            title: "Consolidation",
          },
          {
            title: "Transaction",
          },
        ]}
      />
      {children}
    </div>
  );
}
