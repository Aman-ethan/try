"use client";

import DrawerTitle from "@/components/Typography/DrawerTitle";
import { Button, Drawer, Spin } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { Suspense, lazy, useState } from "react";

const UploadPositionStatement = lazy(
  () => import("../Form/UploadPositionStatement")
);
const UploadTradeStatement = lazy(() => import("../Form/UploadTradeStatement"));
const UploadBankStatement = lazy(() => import("../Form/UploadBankStatement"));

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
    <DrawerTitle className="capitalize">
      Upload {layoutSegment} Statement
    </DrawerTitle>
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
        <Suspense fallback={<Spin size="large" />}>
          <StatementForm />
        </Suspense>
      </Drawer>
    </>
  );
}
