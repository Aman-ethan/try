"use client";

import { Row } from "antd";
import Title from "@/components/Auth/Typography/Title";
import StatementDatePicker from "@/components/Main/Statements/Input/StatementDatePicker";
import SelectClient from "@/components/Main/Statements/Input/SelectClient";
import SelectCustodian from "@/components/Main/Statements/Input/SelectCustodian";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactElement } from "react";
import StatementDrawer from "@/components/Main/Statements/Common/UploadStatementDrawer";

interface IStatementLayoutProps {
  children: ReactElement;
}

export default function StatementLayout({ children }: IStatementLayoutProps) {
  const layoutSegment = useSelectedLayoutSegment();
  return (
    <div className="px-12 py-6 space-y-8">
      <div className="space-y-6">
        <Row justify="space-between">
          <Title className="capitalize">{layoutSegment} Statement</Title>
          <StatementDrawer />
        </Row>
        <Row className="max-w-3xl space-x-4">
          <SelectClient placeholder="All Client" className="flex-1" />
          <SelectCustodian placeholder="All Custodian" className="flex-1" />
          <div className="flex w-48">
            <StatementDatePicker />
          </div>
        </Row>
      </div>
      <div className="bg-neutral-1 w-full h-[calc(100vh-16rem)] p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
}
