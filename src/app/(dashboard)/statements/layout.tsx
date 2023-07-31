import { ReactNode } from "react";
import StatementHeader from "@/components/Main/Statements/General/StatementHeader";

interface IStatementLayoutProps {
  children: ReactNode;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  return (
    <div className="space-y-8">
      <StatementHeader />
      <div className="rounded-lg bg-neutral-1 shadow-large p-6">{children}</div>
    </div>
  );
}
