"use client";

import { capitalize } from "lodash";
import { useSelectedLayoutSegment } from "next/navigation";
import { lazy } from "react";
import FormDrawer from "../../General/FormDrawer";

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
    <FormDrawer buttonText="Add a Statement" title={title}>
      <StatementForm />
    </FormDrawer>
  );
}
