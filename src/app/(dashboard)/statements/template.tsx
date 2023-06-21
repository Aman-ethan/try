"use client";

import { Row } from "antd";
import Title from "@/components/Auth/Common/Title";
import StatementDatePicker from "@/components/Main/Statements/StatementDatePicker";
import SelectClient from "@/components/Main/Common/SelectClient";
import SelectCustodian from "@/components/Main/Common/SelectCustodian";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactElement } from "react";
import StatementDrawer from "@/components/Main/Statements/StatementDrawer";

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
          <SelectClient placeholder="All Client" />
          <SelectCustodian placeholder="All Custodian" />
          <div className="flex w-48">
            <StatementDatePicker />
          </div>
        </Row>
      </div>
      <div className="bg-neutral-1 w-full h-[calc(100vh-16rem)] overflow-y-scroll p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
}
