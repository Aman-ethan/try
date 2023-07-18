import { IDrawerProps } from "@/interfaces/Main";
import { ReactElement } from "react";
import { SubmitButton } from "../../General/DrawerFormButton";
import EditFormDrawer from "../../General/EditFormDrawer";
import TradeForm from "../Form/Trade";

interface IEditTradeDrawerProps {
  id?: string;
  button: ReactElement;
}

const urls = {
  get: "/blotter-trade/",
  put: "/blotter-trade/{id}/",
};

const drawerProps: IDrawerProps = {
  title: "Edit Trade",
  footer: <SubmitButton>Save Trade</SubmitButton>,
  closeButton: "Cancel",
};

const message = {
  success: "Trade edited successfully",
  error: "Error editing trade",
};

export default function EditTradeDrawer({ id, button }: IEditTradeDrawerProps) {
  return (
    <EditFormDrawer
      id={id}
      urls={urls}
      formComponent={TradeForm}
      message={message}
      drawerProps={{ button, ...drawerProps }}
    />
  );
}
