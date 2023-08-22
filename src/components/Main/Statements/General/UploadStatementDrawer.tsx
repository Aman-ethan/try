"use client";

import { Button } from "antd";
import { capitalize } from "lodash";
import { useSelectedLayoutSegment } from "next/navigation";
import { lazy } from "react";
import Drawer from "../../General/Drawer";
import DrawerFormFooter from "../../General/DrawerFormFooter";

const UploadStatement = lazy(() => import("../Form/UploadStatement"));
const UploadBankStatement = lazy(() => import("../Form/UploadBankStatement"));

function StatementForm() {
  const layoutSegment = useSelectedLayoutSegment();
  switch (layoutSegment) {
    case "position":
    case "trade":
      return <UploadStatement key={layoutSegment} />;
    case "bank":
      return <UploadBankStatement />;
    default:
      return null;
  }
}

export default function UploadStatementDrawer() {
  const layoutSegment = useSelectedLayoutSegment() as string;
  const title = `Add ${capitalize(layoutSegment)} Statement`;

  return (
    <Drawer
      button={
        <Button type="primary" size="large" className="flex-1 tab:w-auto">
          Add Statement
        </Button>
      }
      title={title}
      footer={<DrawerFormFooter />}
    >
      <StatementForm />
    </Drawer>
  );
}
