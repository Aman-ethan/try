"use client";

import { MenuItemClassName } from "@/constants/strings";
import { IDrawerProps } from "@/interfaces/Main";
import { SubmitButton } from "../../General/DrawerFormButton";
import EditFormDrawer from "../../General/EditFormDrawer";
import PositionStatementForm from "../Form/PositionStatementForm";
import TradeStatementForm from "../Form/TradeStatementForm";

interface IEditStatementDrawerProps {
  id?: string;
  layoutSegment: "trade" | "position";
}

const drawerProps: IDrawerProps = {
  button: (
    <button type="button" className={MenuItemClassName}>
      Edit
    </button>
  ),
  footer: <SubmitButton>Submit</SubmitButton>,
  closeButton: "Cancel",
};

const FormComponentsMap = {
  position: PositionStatementForm,
  trade: TradeStatementForm,
};

export default function EditStatementDrawer({
  id,
  layoutSegment,
}: IEditStatementDrawerProps) {
  const urls = {
    get: `/statement/${layoutSegment}/`,
    put: `/statement/${layoutSegment}/{id}/`,
  };
  const message = {
    success: `${layoutSegment} statement edited successfully`,
    error: `Error editing ${layoutSegment} statement`,
  };
  return (
    <EditFormDrawer
      id={id}
      urls={urls}
      message={message}
      formComponent={FormComponentsMap[layoutSegment]}
      drawerProps={{
        title: `Edit ${layoutSegment} Statement`,
        ...drawerProps,
      }}
    />
  );
}
