import StatementHeader from "@/components/Main/Statements/General/StatementHeader";

interface IStatementLayoutProps {
  children: React.ReactNode;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  return (
    <div className="px-12 pt-6 flex flex-col flex-1">
      <StatementHeader />
      <div className="bg-neutral-1 flex-1 p-6 rounded-lg my-8">{children}</div>
    </div>
  );
}
