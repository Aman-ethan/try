import StatementHeader from "@/components/Main/Statements/General/StatementHeader";
import { ReactNode } from "react";

interface IStatementLayoutProps {
  children: ReactNode;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  return (
    <div className="space-y-8 px-12 py-6">
      <StatementHeader />
      <div className="rounded-lg bg-neutral-1 p-6">{children}</div>
    </div>
  );
}
