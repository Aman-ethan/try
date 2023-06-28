"use client";

import { Button, Spin } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import { Suspense, lazy, useId } from "react";
import { capitalize } from "lodash";
import { IStatementFormProps } from "@/interfaces/Main";
import Drawer from "../../General/Drawer";

const UploadPositionStatement = lazy(
  () => import("../Form/UploadPositionStatement")
);
const UploadTradeStatement = lazy(() => import("../Form/UploadTradeStatement"));
const UploadBankStatement = lazy(() => import("../Form/UploadBankStatement"));

function StatementForm({ id }: IStatementFormProps) {
  const layoutSegment = useSelectedLayoutSegment();
  switch (layoutSegment) {
    case "position":
      return <UploadPositionStatement id={id} />;
    case "trade":
      return <UploadTradeStatement id={id} />;
    case "bank":
      return <UploadBankStatement id={id} />;
    default:
      return null;
  }
}

export default function UploadStatementDrawer() {
  const id = useId();
  const layoutSegment = useSelectedLayoutSegment() as string;

  const title = `Upload ${capitalize(layoutSegment)} Statement`;

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
        >
          Upload
        </Button>
      }
    >
      <Suspense fallback={<Spin size="large" />}>
        <StatementForm id={id} />
      </Suspense>
    </Drawer>
  );
}
