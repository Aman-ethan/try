import StatementHeader from "@/components/Main/Statements/General/StatementHeader";
import { ReactNode } from "react";

interface IStatementLayoutProps {
  children: ReactNode;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  return (
    <div className="px-12 py-6 space-y-8">
      <StatementHeader />
      <div className="bg-neutral-1 p-6 rounded-lg">{children}</div>
    </div>
  );
}
