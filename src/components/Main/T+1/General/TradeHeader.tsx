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

  const containerClasses =
    "w-full flex flex-col tab:flex-row tab:items-center tab:space-x-4";
  const outerContainerClasses =
    "flex flex-1 flex-col space-y-4 lap:flex-row lap:items-center lap:space-x-4 lap:space-y-0";
  const innerContainerClasses =
    "flex flex-1 flex-col space-y-4 tab:flex-row tab:items-center tab:space-x-4 tab:space-y-0";
  const filterButtonClasses = "flex-1 order-first mb-4 lap:hidden tab:hidden";

  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "tab:flex tab:w-80"
  );

  return (
    <div className="space-y-6">
      <Row justify="space-between" align="middle">
        <Title>{title === "transaction" ? "Trades" : title}</Title>
        <div className="hidden tab:block">
          <AddTradeDrawer />
        </div>
      </Row>
      <Row>
        <div className={containerClasses}>
          <div className={outerContainerClasses}>
            <div className={innerContainerClasses}>
              <SelectClientWithParams
                placeholder="Select a Client"
                className={primarySelectClasses}
              />
              <SelectCustodianWithParams
                placeholder="All Custodian"
                className={primarySelectClasses}
              />
            </div>
          </div>
          <div className="order-first flex w-full space-x-2 tab:order-last tab:w-auto tab:self-start">
            <div className="order-first block flex-1 tab:hidden">
              <AddTradeDrawer />
            </div>
            <Button
              size="large"
              icon={<FilterOutlined />}
              className={filterButtonClasses}
              onClick={() => setShowFilter(!showFilter)}
            >
              Filters
            </Button>
          </div>
        </div>
      </Row>
    </div>
  );
}
