"use client";

import { Button, Drawer } from "antd";
import { lazy, useState } from "react";

interface IDetailType {
    type: string;
}

const GoalsForm = lazy(
  () => import("../Forms/GoalsForm")
);
const EstatesForm = lazy(
  () => import("../Forms/EstatesForm")
);
const BankAccountsForm = lazy(() => import("../Forms/BankAccountsForm"));

function DetailsForm({type}:IDetailType) {
  switch (type) {
    case "goals":
      return <GoalsForm />;
    case "estates":
      return <EstatesForm />;
    case "bank accounts":
      return <BankAccountsForm />;
    default:
      return null;
  }
}

export default function ClientDetailsDrawer({type}:IDetailType) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const title = (
    <span className="text-xl font-medium capitalize">
      {`Add ${type}`}
    </span>
  );
  return (
    <>
      <Button type="primary" size="large" className="capitalize" onClick={() => setIsDrawerOpen(true)}>
        {`Add ${type}`}
      </Button>
      <Drawer
        width={720}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={title}
      >
        <DetailsForm type={type}/>
      </Drawer>
    </>
  );
}
