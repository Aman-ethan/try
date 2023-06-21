"use client";

import Title from "@/components/Auth/Common/Title";
import { DatePicker } from "@/components/Main/Common/DatePicker";
import SelectClient from "@/components/Main/Common/SelectClient";
import SelectCustodian from "@/components/Main/Common/SelectCustodian";
import { Button, Row } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";

export default function StatementLayout() {
  const pathname = useSelectedLayoutSegment();
  return (
    <div className="px-12 py-6 space-y-6">
      <Row justify="space-between">
        <Title className="capitalize">{pathname} Statement</Title>
        <Button type="primary" size="large">
          Add a Statement
        </Button>
      </Row>
      <Row className="max-w-3xl space-x-4">
        <div className="flex-1">
          <SelectClient />
        </div>
        <div className="flex-1">
          <SelectCustodian />
        </div>
        <div className="w-52">
          <DatePicker />
        </div>
      </Row>
    </div>
  );
}
