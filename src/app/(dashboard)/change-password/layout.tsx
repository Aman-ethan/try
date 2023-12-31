import Title from "@/components/Typography/Title";
import { ILayoutProps } from "@/interfaces/Main";

export default function ChangePasswordLayout({ children }: ILayoutProps) {
  return (
    <div className="h-[calc(100vh-4.625rem)] lap:pt-6">
      <div className="h-full space-y-10 rounded-lg bg-neutral-1 p-8">
        <Title level={2}>Change password</Title>
        <div className="max-w-sm">{children}</div>
      </div>
    </div>
  );
}
