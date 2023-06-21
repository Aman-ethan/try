"use client";

import { Button } from "antd";
import { useState } from "react";

export default function StatementDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Button type="primary" size="large" onClick={() => setShowDrawer(true)}>
      Add a Statement
    </Button>
  );
}
