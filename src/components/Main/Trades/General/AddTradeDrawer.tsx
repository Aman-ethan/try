import { Button, Drawer } from "antd";
import { useState } from "react";

export default function AddTradeDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsDrawerOpen(true)}>
        Add Blotter Trade
      </Button>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      ></Drawer>
    </>
  );
}
