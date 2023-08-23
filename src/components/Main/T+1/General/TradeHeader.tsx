"use client";

import { FilterOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Title from "@/components/Typography/Title";
import SelectClientWithParams from "../../Input/SelectClientWithParams";
import SelectCustodianWithParams from "../../Input/SelectCustodianWithParams";
import AddTradeDrawer from "./AddTradeDrawer";

export default function TradeHeader() {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const title = selectedLayoutSegment?.split("-").join(" ") || "";
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="space-y-4 tab:space-y-6">
      <Row justify="space-between" align="middle">
        <Title>{title}</Title>
        <div className="hidden tab:block">
          <AddTradeDrawer />
        </div>
      </Row>
      <div className="space-y-4 tab:space-y-6">
        <div className="flex gap-4 tab:hidden">
          <AddTradeDrawer />
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="flex-1"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters
          </Button>
        </div>
        <div
          className={clsx(
            showFilter ? "block" : "hidden",
            "flex flex-col gap-2 tab:flex tab:flex-row tab:gap-6 lap:gap-4 lap:max-w-[39.125rem]"
          )}
        >
          <SelectClientWithParams placeholder="Select a Client" />
          <SelectCustodianWithParams placeholder="All Custodian" />
        </div>
      </div>
    </div>
  );
}
