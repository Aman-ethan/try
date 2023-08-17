import { ReactNode } from "react";
import StatementHeader from "@/components/Main/Statements/General/StatementHeader";

interface IStatementLayoutProps {
  children: ReactNode;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  return (
    <div className="space-y-4 tab:space-y-6 lap:space-y-8">
      <StatementHeader />
      <div className="rounded-lg bg-neutral-1 p-6 shadow-large">{children}</div>
    </div>
  );
}
