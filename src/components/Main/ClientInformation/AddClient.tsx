"use client";

import FormDrawer from "../General/FormDrawer";
import NewClientUpload from "./Forms/NewClientUpload";

export default function AddClient() {
  return (
    <FormDrawer buttonText="Add Clients" title="Add New Client">
      <NewClientUpload />
    </FormDrawer>
  );
}
