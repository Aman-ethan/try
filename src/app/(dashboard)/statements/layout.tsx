import StatementHeader from "@/components/Main/Statements/General/StatementHeader";

interface IStatementLayoutProps {
  children: React.ReactNode;
  slot?: React.ReactNode;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  return (
    <div className="px-12 py-6">
      <div className="space-y-6">
        <StatementHeader />
      </div>
      <div className="bg-neutral-1 w-full h-[calc(100vh-16rem)] p-6 rounded-lg mt-8">
        {children}
      </div>
    </div>
  );
}
