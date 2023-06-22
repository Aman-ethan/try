"use client";

import { Button, Drawer } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { lazy, useState } from "react";

const UploadPositionStatement = lazy(
  () => import("../Forms/UploadPositionStatement")
);
const UploadTradeStatement = lazy(
  () => import("../Forms/UploadTradeStatement")
);
const UploadBankStatement = lazy(() => import("../Forms/UploadBankStatement"));

function StatementForm() {
  const layoutSegment = useSelectedLayoutSegment();
  switch (layoutSegment) {
    case "position":
      return <UploadPositionStatement />;
    case "trade":
      return <UploadTradeStatement />;
    case "bank":
      return <UploadBankStatement />;
    default:
      return null;
  }
}

export default function UploadStatementDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const layoutSegment = useSelectedLayoutSegment();

  const title = (
    <span className="text-xl font-medium">
      Upload{" "}
      {layoutSegment
        ? layoutSegment[0].toUpperCase() + layoutSegment.slice(1)
        : ""}{" "}
      Statement
    </span>
  );
  return (
    <>
      <Button type="primary" size="large" onClick={() => setIsDrawerOpen(true)}>
        Add a Statement
      </Button>
      <Drawer
        width={720}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={title}
      >
        <StatementForm />
      </Drawer>
    </>
  );
}
