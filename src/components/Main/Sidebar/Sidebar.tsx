"use client";

import { Divider, Menu } from "antd";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import ROUTE from "@/constants/route";
import { TCurrency } from "@/interfaces/Main";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import SelectDurationWithParams from "../Input/SelectDurationWithParams";
import CurrencyTag from "../General/CurrencyTag";

interface IUser {
  name: string;
  username: string;
  reporting_currency: TCurrency | null;
}

export default function Sidebar() {
  const pathname = usePathname();
  const layoutSegments = useSelectedLayoutSegments();
  const openKey = layoutSegments.length > 1 ? [layoutSegments[0]] : undefined;
  const selectedKeys = pathname ? [pathname] : undefined;
  const { data } = useTransactionServerQuery<IUser>("/users/me/");
  const { reporting_currency } = data || {};

  return (
    <div className="flex flex-col justify-start gap-2">
      <div className="flex w-full flex-row items-center">
        <SelectDurationWithParams />
        <Divider type="vertical" className="text-neutral-13/5" />
        <CurrencyTag currency={reporting_currency || "usd"} />
      </div>
      <Menu
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKey}
        items={ROUTE}
        mode="inline"
        className="border-none"
      />
    </div>
  );
}
