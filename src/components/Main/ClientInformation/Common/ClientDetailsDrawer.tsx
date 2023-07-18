"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { lazy, useState } from "react";
import useSearchParams from "@/hooks/useSearchParams";

interface IClientDetailsDrawerProps {
  type: string;
  edit?: boolean;
  id?: string;
}

interface IDetailsFormProps {
  type: string;
  onClose: () => void;
}

const GoalsForm = lazy(() => import("../Forms/GoalsForm"));
const EstatesForm = lazy(() => import("../Forms/EstatesForm"));
const BankAccountsForm = lazy(() => import("../Forms/BankAccountsForm"));

function DetailsForm({ type, onClose }: IDetailsFormProps) {
  switch (type) {
    case "goals":
      return <GoalsForm onClose={onClose} />;
    case "estates":
      return <EstatesForm onClose={onClose} />;
    case "bank_accounts":
      return <BankAccountsForm onClose={onClose} />;
    default:
      return null;
  }
}

export default function ClientDetailsDrawer({
  type,
  edit,
  id,
}: IClientDetailsDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { updateSearchParams } = useSearchParams();

  const title = (
    <span className="text-xl font-medium capitalize">
      {edit ? `Edit` : `Add ${type.replace("_", " ")}`}
    </span>
  );
  return (
    <>
      <Button
        type={edit ? "default" : "primary"}
        size="large"
        className="capitalize"
        onClick={() => setIsDrawerOpen(true)}
        icon={
          edit ? (
            <EditOutlined
              onClick={() => {
                switch (type) {
                  case "goals":
                    updateSearchParams({ goal_id: id });
                    break;
                  case "estates":
                    updateSearchParams({ estate_id: id });
                    break;
                  case "bank_accounts":
                    updateSearchParams({ bank_account_id: id });
                    break;
                  default:
                    break;
                }
              }}
            />
          ) : undefined
        }
      >
        {edit ? "" : `Add ${type.replace("_", " ")}`}
      </Button>
      <Drawer
        width={720}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          updateSearchParams({
            goal_id: null,
            estate_id: null,
            bank_account_id: null,
            custodian: null,
          });
        }}
        title={title}
      >
        <DetailsForm type={type} onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
