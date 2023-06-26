"use client";

import { Button, Drawer } from "antd";
import { useState } from "react";
import NewClientUpload from "./Forms/NewClientUpload";

export default function AddClient() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        size="large"
        block
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Clients
      </Button>
      <Drawer
        width={720}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add Client"
      >
        <NewClientUpload onFinish={() => {}} />
      </Drawer>
    </>
  );
}
