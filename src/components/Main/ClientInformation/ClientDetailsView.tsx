"use client";

import { CheckboxOptionType, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useClientBreadCrumb } from "@/context/ClientContext";
import { TTabType } from "@/interfaces/Main";
import BankAccounts from "./BankAccounts";
import ClientDetailsDrawer from "./Common/ClientDetailsDrawer";
import Estates from "./Estates";
import Goals from "./Goals";

function View({ type }: { type: TTabType }) {
  switch (type) {
    case "goals":
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
  { label: "Goals", value: "goals" },
  { label: "Estates", value: "estate" },
  { label: "Bank Accounts", value: "bank_account" },
];

export default function ClientDetailsView() {
  const { setBreadItems } = useClientBreadCrumb();
  const [type, setType] = useState<TTabType>("goals");
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };
  useEffect(() => {
    setBreadItems(type);
  }, [setBreadItems, type]);
  return (
    <div className="space-y-6 w-full">
      <div className=" w-full flex flex-col tab:flex-row tab:justify-between">
        <Radio.Group
          options={DetailOptions}
          value={type}
          onChange={handleTypeChange}
          optionType="button"
          buttonStyle="outline"
          size="large"
        />
        <div className="self-end mt-4 tab:mt-0">
          <ClientDetailsDrawer type={type} />
        </div>
      </div>
      <div>
        <View type={type} />
      </div>
    </div>
  );
}
