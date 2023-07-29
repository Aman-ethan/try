"use client";

import { CheckboxOptionType, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import BankAccounts from "./BankAccounts";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import Estates from "./Estates";
import Goals from "./Goals";

type TabType = "goals" | "estates" | "accounts";

function View({ type }: { type: TabType }) {
  switch (type) {
    case "goals":
      return <Goals />;
    case "estates":
      return <Estates />;
    case "accounts":
      return <BankAccounts />;
    default:
      return null;
  }
}

const DetailOptions: CheckboxOptionType[] = [
  { label: "Goals", value: "goals" },
  { label: "Estates", value: "estates" },
  { label: "Accounts", value: "accounts" },
];

export default function ClientDetailsView() {
  const [type, setType] = useState<TabType>("goals");
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };
  return (
    <div className="space-y-8 py-5">
      <div className="flex flex-col tab:flex-row tab:justify-between">
        <Radio.Group
          options={DetailOptions}
          value={type}
          onChange={handleTypeChange}
          optionType="button"
          buttonStyle="outline"
          size="large"
        />
        <div className="mt-4 tab:mt-0">
          <ClientDetailsDrawer type={type} />
        </div>
      </div>
      <div>
        <View type={type} />
      </div>
    </div>
  );
}
