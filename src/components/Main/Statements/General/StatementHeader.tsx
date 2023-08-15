"use client";

import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Title from "@/components/Typography/Title";
import SelectClient from "../../Input/SelectClientWithParams";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import DownloadStatement from "./DownloadStatement";
import UploadStatementDrawer from "./UploadStatementDrawer";

export default function StatementFilter() {
  const layoutSegment = useSelectedLayoutSegment();
  const [showFilter, setShowFilter] = useState(false);

  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "tab:flex tab:w-1/2"
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 tab:flex-row tab:items-center tab:justify-between tab:space-y-0">
        <div className="flex justify-between">
          <Title className="capitalize">{layoutSegment} Statement</Title>
          <div className="mob:block tab:hidden lap:hidden">
            {layoutSegment === "position" ? null : (
              <DownloadStatement title="CSV" />
            )}
          </div>
        </div>

        <div className="flex w-full flex-row space-x-4 tab:w-auto">
          <div className="flex mob:w-1/2">
            <UploadStatementDrawer />
          </div>

          <div className="flex mob:max-w-lg">
            <Button
              size="large"
              icon={<FilterOutlined />}
              className="order-last tab:hidden "
              onClick={() => setShowFilter(!showFilter)}
            >
              Filters
            </Button>
          </div>

          <div className="hidden tab:block lap:hidden">
            {layoutSegment === "position" ? null : (
              <DownloadStatement title="CSV" />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex max-w-2xl flex-1 flex-col space-y-2 tab:flex-row tab:space-x-4 tab:space-y-0">
          <SelectClient
            placeholder="All Client"
            className={primarySelectClasses}
          />
          <SelectCustodian
            placeholder="All Custodian"
            className={primarySelectClasses}
          />
        </div>
        <div className="hidden lap:block">
          {layoutSegment === "position" ? null : <DownloadStatement />}
        </div>
      </div>
    </div>
  );
}
