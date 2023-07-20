import { ILayoutProps } from "@/interfaces/Main";
import { Title } from "@/lib/antd";

export default function TradeLayout({ children }: ILayoutProps) {
  return (
    <div className="px-12 py-8 h-[calc(100vh-4.625rem)]">
      <div className="rounded-lg bg-neutral-1 space-y-10 p-8 h-full">
        <Title level={2}>Change password</Title>
        <div className="max-w-sm">{children}</div>
      </div>
    </div>
  );
}
