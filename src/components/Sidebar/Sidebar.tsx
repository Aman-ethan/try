"use client";

import { Menu } from "antd";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { TCurrency } from "@/interfaces/Main";
import ROUTE from "@/constants/route";
import CurrencyTag from "../Main/General/CurrencyTag";
import SelectDurationWithParams from "../Main/Input/SelectDurationWithParams";

interface IUser {
  name: string;
  username: string;
  reporting_currency: TCurrency | null;
}

interface ILayoutProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: ILayoutProps) {
  const pathname = usePathname();
  const layoutSegments = useSelectedLayoutSegments();
  const openKey = layoutSegments.length > 1 ? [layoutSegments[0]] : undefined;
  const selectedKeys = pathname ? [pathname] : undefined;
  const { data } = useTransactionServerQuery<IUser>("/users/me/");
  const { reporting_currency } = data || {};

  return (
    <div className="flex flex-col justify-start gap-y-4">
      <CurrencyTag currency={reporting_currency || "usd"} />
      <div className="w-full">
        <SelectDurationWithParams />
      </div>
      <Menu
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKey}
        items={ROUTE}
        mode="inline"
        className="border-none"
        onClick={() => {
          onClose();
        }}
      />
    </div>
  );
}
