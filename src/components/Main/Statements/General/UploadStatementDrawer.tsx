"use client";

import { Button } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { lazy, useId, useMemo, useState } from "react";
import { capitalize } from "lodash";
import StatementFormContext from "@/context/StatementFormContext";
import Drawer from "../../General/Drawer";

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
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);

  const layoutSegment = useSelectedLayoutSegment() as string;

  const title = `Upload ${capitalize(layoutSegment)} Statement`;

  const contextValue = useMemo(() => ({ id, setIsLoading }), [id]);

  return (
    <Drawer
      buttonText="Add a Statement"
      width={720}
      title={title}
      footer={
        <Button
          form={id}
          type="primary"
          size="large"
          className="px-7"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
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
