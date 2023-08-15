"use client";

import { Menu } from "antd";
import ROUTE from "@/constants/route";
import useSidebar from "@/hooks/useSidebar";
import CurrencyTag from "../Main/General/CurrencyTag";
import SelectDurationWithParams from "../Main/Input/SelectDurationWithParams";

interface ILayoutProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: ILayoutProps) {
  const { openKey, reporting_currency, selectedKeys } = useSidebar();

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
