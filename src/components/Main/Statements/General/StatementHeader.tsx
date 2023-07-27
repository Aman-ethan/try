"use client";

import Title from "@/components/Typography/Title";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import { CSVLink } from "react-csv";
import SelectClient from "../../Input/SelectClientWithParams";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import UploadStatementDrawer from "./UploadStatementDrawer";

const DownloadUrls = {
  trade: "",
};

export default function StatementFilter() {
  const layoutSegment = useSelectedLayoutSegment() as keyof typeof DownloadUrls;
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
      <div className="flex justify-between">
        <div className="flex flex-1 max-w-2xl flex-col space-y-4 tab:flex-row tab:space-x-4 tab:space-y-0">
          <SelectClient
            placeholder="All Client"
            className={primarySelectClasses}
          />
          <SelectCustodian
            placeholder="All Custodian"
            className={primarySelectClasses}
          />
        </div>
        {layoutSegment === "trade" ? (
          <Button
            size="large"
            icon={<DownloadOutlined />}
            href={DownloadUrls.trade}
            download
          />
        ) : (
          <Button
            size="large"
            disabled={layoutSegment === "position"}
            icon={<DownloadOutlined />}
          >
            <CSVLink data={[]} filename="bank_statement.csv">
              Download as CSV
            </CSVLink>
          </Button>
        )}
      </div>
    </div>
  );
}
