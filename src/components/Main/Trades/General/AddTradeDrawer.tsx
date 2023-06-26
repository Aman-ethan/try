import DrawerTitle from "@/components/Typography/DrawerTitle";
import { Button, Drawer } from "antd";
import { useState } from "react";
import AddTrade from "../Form/AddTrade";

export default function AddTradeDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const title = <DrawerTitle>Add a Trade</DrawerTitle>;
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsDrawerOpen(true)}>
        Add Blotter Trade
      </Button>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={720}
        title={title}
      >
        <AddTrade />
      </Drawer>
    </>
  );
}
