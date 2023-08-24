"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { lazy, useState } from "react";
import useResize from "@/hooks/useResize";
import { TTabType } from "@/interfaces/Main";
import Drawer from "../../General/Drawer";
import DrawerFormFooter from "../../General/DrawerFormFooter";

interface IClientDetailsDrawerProps {
  type: TTabType;
  edit?: boolean;
  id?: string;
}

interface IDetailsFormProps {
  type: TTabType;
  id?: string;
  onClose: () => void;
}

const GoalsForm = lazy(() => import("../Forms/GoalsForm"));
const EstatesForm = lazy(() => import("../Forms/EstatesForm"));
const BankAccountsForm = lazy(() => import("../Forms/BankAccountsForm"));

function DetailsForm({ id, type, onClose }: IDetailsFormProps) {
  switch (type) {
    case "goal":
      return <GoalsForm id={id} onClose={onClose} />;
    case "estate":
      return <EstatesForm id={id} onClose={onClose} />;
    case "bank_account":
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

  const deleteButtonStyle = edit
    ? { height: "34px", width: "34px" }
    : undefined;
  const title = edit ? `Edit` : `Add ${type.replace("_", " ")}`;

  return (
    <Drawer
      width={570}
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
          className="capitalize flex justify-center items-center"
          size="large"
          icon={edit ? <EditOutlined className="text-sm" /> : undefined}
          style={deleteButtonStyle}
        >
          {edit ? "" : `Add ${type.replace("_", " ")}`}
        </Button>
      }
      footer={<DrawerFormFooter />}
    >
      <DetailsForm id={id} type={type} onClose={() => setIsDrawerOpen(false)} />
    </Drawer>
  );
}
