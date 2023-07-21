"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { lazy, useState } from "react";
import useSearchParams from "@/hooks/useSearchParams";
import useResize from "@/hooks/useResize";
import Drawer from "../../General/Drawer";
import { ResetButton, SubmitButton } from "../../General/DrawerFormButton";

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
  const { placement } = useResize();

  const title = (
    <span className="text-xl font-medium capitalize">
      {edit ? `Edit` : `Add ${type.replace("_", " ")}`}
    </span>
  );
  return (
    <Drawer
      width={720}
      height={600}
      placement={placement}
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
      button={
        <Button
          onClick={() => setIsDrawerOpen(true)}
          type={edit ? "default" : "primary"}
          className="capitalize"
          size="large"
          icon={
            edit ? (
              <EditOutlined
                className="text-sm"
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
      }
      footer={
        <>
          <ResetButton>Clear All</ResetButton>
          <SubmitButton>Submit</SubmitButton>
        </>
      }
    >
      <DetailsForm type={type} onClose={() => setIsDrawerOpen(false)} />
    </Drawer>
  );
}
