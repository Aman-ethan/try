"use client";

import { Button } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { lazy, useId, useMemo, useState } from "react";
import { capitalize } from "lodash";
import StatementFormContext from "@/context/StatementFormContext";
import Drawer from "../../General/Drawer";

const UploadStatement = lazy(() => import("../Form/UploadStatement"));
const UploadBankStatement = lazy(() => import("../Form/UploadBankStatement"));

function StatementForm() {
  const layoutSegment = useSelectedLayoutSegment();
  switch (layoutSegment) {
    case "position":
      return <UploadStatement urlKey="/statement/position/upload/" />;
    case "trade":
      return <UploadStatement urlKey="/statement/trade/upload/" />;
    case "bank":
      return <UploadBankStatement />;
    default:
      return null;
  }
}

export default function UploadStatementDrawer() {
  const formId = useId();
  const [isMutating, setIsMutating] = useState(false);

  const layoutSegment = useSelectedLayoutSegment() as string;

  const title = `Upload ${capitalize(layoutSegment)} Statement`;

  const contextValue = useMemo(() => ({ formId, setIsMutating }), [formId]);

  return (
    <Drawer
      buttonText="Add a Statement"
      width={720}
      title={title}
      footer={
        <Button
          form={formId}
          type="primary"
          size="large"
          className="px-7"
          htmlType="submit"
          loading={isMutating}
          disabled={isMutating}
        >
          Upload
        </Button>
      }
    >
      <StatementFormContext.Provider value={contextValue}>
        <StatementForm />
      </StatementFormContext.Provider>
    </Drawer>
  );
}
