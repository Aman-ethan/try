"use client";

import { Divider, Menu } from "antd";
import ROUTE from "@/constants/route";
import useSidebar from "@/hooks/useSidebar";
import CurrencyTag from "../General/CurrencyTag";
import SelectDurationWithParams from "../Input/SelectDurationWithParams";

export default function Sidebar() {
  const { openKey, reporting_currency, selectedKeys } = useSidebar();

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
