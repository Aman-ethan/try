"use client";

import { Button, Spin } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { Suspense, lazy } from "react";
import Drawer from "../../General/Drawer";
import { capitalize } from "lodash";

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
  const layoutSegment = useSelectedLayoutSegment() as string;

  const title = `Upload ${capitalize(layoutSegment)} Statement`;

  return (
    <Drawer
      buttonText="Add a Statement"
      width={720}
      title={title}
      footer={
        <Button type="primary" size="large" className="px-7" htmlType="submit">
          Upload
        </Button>
      }
    >
      <Suspense fallback={<Spin size="large" />}>
        <StatementForm />
      </Suspense>
    </Drawer>
  );
}
