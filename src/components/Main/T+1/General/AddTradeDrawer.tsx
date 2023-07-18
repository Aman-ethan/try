import { IDrawerProps } from "@/interfaces/Main";
import { Button } from "antd";
import AddFormDrawer from "../../General/AddFormDrawer";
import { ResetButton, SubmitButton } from "../../General/DrawerFormButton";
import TradeForm from "../Form/Trade";

const drawerProps: IDrawerProps = {
  button: (
    <Button type="primary" size="large">
      Add Trade
    </Button>
  ),
  title: "Add a Trade",
  footer: (
    <>
      <ResetButton>Clear All</ResetButton>
      <SubmitButton>Save Trade</SubmitButton>
    </>
  ),
};

const message = {
  success: "Trade added successfully",
  error: "Error adding trade",
};

const URLs = {
  get: "/blotter-trade/",
  post: "/blotter-trade/",
};

export default function AddTradeDrawer() {
  return (
    <AddFormDrawer
      urls={URLs}
      drawerProps={drawerProps}
      formComponent={TradeForm}
      message={message}
    />
  );
}