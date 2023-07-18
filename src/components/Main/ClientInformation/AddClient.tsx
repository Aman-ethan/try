"use client";

import { Button } from "antd";
import Drawer from "../General/Drawer";
import ClientUpload from "./Forms/ClientUpload";
import DrawerFormFooter from "../General/DrawerFormFooter";

export default function AddClient() {
  return (
    <Drawer
      button={
        <Button type="primary" size="large">
          Add Clients
        </Button>
      }
      title="Add New Client"
      footer={<DrawerFormFooter />}
    >
      <ClientUpload />
    </Drawer>
  );
}
