"use client";

import { useState } from "react";
import SelectClient from "@/components/Main/Input/SelectClientWithParams";
import SelectCustodian from "@/components/Main/Input/SelectCustodianWithParams";
import { Button } from "@/lib/antd";
import { FilterOutlined } from "@ant-design/icons";
import clsx from "clsx";

export default function GainerLoserFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "tab:flex"
  );
  return (
    <div className="flex max-w-lg flex-col">
      <div className="flex max-w-lg flex-col space-y-4 tab:flex-row tab:space-x-4 tab:space-y-0 ">
        <SelectClient
          placeholder="All Client"
          className={primarySelectClasses}
        />
        <SelectCustodian
          placeholder="All Custodian"
          className={primarySelectClasses}
        />
      </div>
      <Button
        size="large"
        icon={<FilterOutlined />}
        className="order-first mb-4 tab:hidden"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filters
      </Button>
    </div>
  );
}