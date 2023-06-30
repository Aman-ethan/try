"use client";

import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import BankAccounts from "./BankAccounts";
import Estates from "./Estates";
import Goals from "./Goals";

type TabType = "goals" | "estates" | "bank accounts";

function View({ type }: { type: TabType }) {
  switch (type) {
    case "goals":
      return <Goals />;
    case "estates":
      return <Estates />;
    case "bank accounts":
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
      <div className="flex justify-between">
        <Radio.Group size="large" value={type} onChange={handleTypeChange}>
          <Radio.Button value="goals">Goals</Radio.Button>
          <Radio.Button value="estates">Estates</Radio.Button>
          <Radio.Button value="bank accounts">Bank Accounts</Radio.Button>
        </Radio.Group>
        <ClientDetailsDrawer type={type} />
      </div>
      <div>
        <View type={type} />
      </div>
    </div>
  );
}
