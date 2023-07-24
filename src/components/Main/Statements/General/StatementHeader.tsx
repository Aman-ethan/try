"use client";

import Title from "@/components/Typography/Title";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import StatementDatePicker from "../Input/StatementDatePicker";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import SelectClient from "../../Input/SelectClientWithParams";
import UploadStatementDrawer from "./UploadStatementDrawer";

export default function StatementFilter() {
  const layoutSegment = useSelectedLayoutSegment();
  const [showFilter, setShowFilter] = useState(false);
  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "flex-1 tab:flex"
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 tab:flex-row tab:items-center tab:justify-between tab:space-y-0">
        <Title className="capitalize">{layoutSegment} Statement</Title>
        <div className="flex w-full flex-row space-x-4 tab:w-auto">
          <UploadStatementDrawer />
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="flex w-1/2 tab:hidden"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters
          </Button>
        </div>
      </div>
      <div className="flex max-w-3xl flex-col space-y-4 tab:flex-row tab:space-x-4 tab:space-y-0">
        <SelectClient
          placeholder="All Client"
          className={primarySelectClasses}
        />
        <SelectCustodian
          placeholder="All Custodian"
          className={primarySelectClasses}
        />
        <StatementDatePicker className={primarySelectClasses} />
      </div>
    </div>
  );
}
