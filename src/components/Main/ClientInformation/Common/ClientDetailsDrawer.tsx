"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { lazy, useState } from "react";
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
  id?: string;
  onClose: () => void;
}

const GoalsForm = lazy(() => import("../Forms/GoalsForm"));
const EstatesForm = lazy(() => import("../Forms/EstatesForm"));
const BankAccountsForm = lazy(() => import("../Forms/BankAccountsForm"));

function DetailsForm({ id, type, onClose }: IDetailsFormProps) {
  switch (type) {
    case "goals":
      return <GoalsForm id={id} onClose={onClose} />;
    case "estates":
      return <EstatesForm id={id} onClose={onClose} />;
    case "accounts":
      return <BankAccountsForm id={id} onClose={onClose} />;
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
      }}
      title={title}
      button={
        <Button
          onClick={() => setIsDrawerOpen(true)}
          type={edit ? "default" : "primary"}
          className="capitalize"
          size="large"
          icon={edit ? <EditOutlined className="text-sm" /> : undefined}
        >
          {edit ? "" : `Add ${type.replace("_", " ")}`}
        </Button>
      }
      footer={
        <div className="absolute bottom-0 right-0 h-16 space-x-4 mr-12">
          <ResetButton>Clear All</ResetButton>
          <SubmitButton>Submit</SubmitButton>
        </div>
      }
    >
      <DetailsForm id={id} type={type} onClose={() => setIsDrawerOpen(false)} />
    </Drawer>
  );
}
