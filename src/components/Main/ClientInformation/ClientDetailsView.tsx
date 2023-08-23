"use client";

import { CheckboxOptionType, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { TTabType } from "@/interfaces/Main";
import BankAccounts from "./BankAccounts";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import Estates from "./Estates";
import Goals from "./Goals";

function View({ type }: { type: TTabType }) {
  switch (type) {
    case "goal":
      return <Goals />;
    case "estate":
      return <Estates />;
    case "bank_account":
      return <BankAccounts />;
    default:
      return null;
  }
}

const DetailOptions: CheckboxOptionType[] = [
  { label: "Goals", value: "goal" },
  { label: "Estates", value: "estate" },
  { label: "Bank Accounts", value: "bank_account" },
];

export default function ClientDetailsView() {
  const [type, setType] = useState<TTabType>("goal");
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };
  return (
    <div className="-mx-5 justify-between space-y-6">
      <div className="flex w-auto flex-col tab:flex-row tab:justify-between">
        <Radio.Group
          options={DetailOptions}
          value={type}
          onChange={handleTypeChange}
          optionType="button"
          buttonStyle="outline"
          size="large"
        />
        <div className="mt-4 self-end tab:mt-0">
          <ClientDetailsDrawer type={type} />
        </div>
      </div>
      <div>
        <View type={type} />
      </div>
    </div>
  );
}
