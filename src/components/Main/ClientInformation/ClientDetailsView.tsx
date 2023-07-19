"use client";

import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import BankAccounts from "./BankAccounts";
import Estates from "./Estates";
import Goals from "./Goals";

type TabType = "goals" | "estates" | "bank_accounts";

function View({ type }: { type: TabType }) {
  switch (type) {
    case "goals":
      return <Goals />;
    case "estates":
      return <Estates />;
    case "bank_accounts":
      return <BankAccounts />;
    default:
      return null;
  }
}

export default function ClientDetailsView() {
  const [type, setType] = useState<TabType>("goals");
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };
  return (
    <div className="space-y-8 py-5">
      <div className="flex flex-col tab:flex-row tab:justify-between">
        <Radio.Group value={type} onChange={handleTypeChange}>
          <Radio.Button value="goals">Goals</Radio.Button>
          <Radio.Button value="estates">Estates</Radio.Button>
          <Radio.Button value="bank_accounts">Bank Accounts</Radio.Button>
        </Radio.Group>
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
