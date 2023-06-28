"use client";

import Title from "@/components/Typography/Title";
import { Row } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import UploadStatementDrawer from "./UploadStatementDrawer";
import SelectClient from "../../Input/SelectClientWithParams";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import StatementDatePicker from "../Input/StatementDatePicker";

export default function StatementFilter() {
  const layoutSegment = useSelectedLayoutSegment();
  return (
    <div className="space-y-6">
      <Row justify="space-between">
        <Title className="capitalize">{layoutSegment} Statement</Title>
        <UploadStatementDrawer />
      </Row>
      <Row className="max-w-3xl space-x-4">
        <SelectClient placeholder="All Client" className="flex-1" />
        <SelectCustodian placeholder="All Custodian" className="flex-1" />
        <div className="flex w-48">
          <StatementDatePicker />
        </div>
      </Row>
    </div>
  );
}
