import { useState } from "react";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Title from "@/components/Typography/Title";
import DetailsSummary from "./DetailsSummary";
import PositionListItems from "./PositionListItems";
import SelectClient from "../Input/SelectClientWithParams";
import SelectCustodian from "../Input/SelectCustodianWithParams";
import MonthPicker from "./Input/MonthPicker";

const containerClasses =
  "flex flex-col tab:justify-between tab:flex-row tab:items-center tab:space-x-4";
const innerContainerClasses =
  "flex flex-1 flex-col space-y-4 tab:flex-row tab:items-center tab:space-x-4 tab:space-y-0";
const filterButtonClasses = "w-full order-first mb-4 self-start tab:hidden";

export default function PositionList() {
  const [showFilter, setShowFilter] = useState(false);

  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "w-full tab:flex lap:max-w-[20rem]"
  );

  return (
    <>
      <Title className="text-2xl tab:text-3xl">Balance Sheet</Title>
      <div className={containerClasses}>
        <div className={innerContainerClasses}>
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
          className={filterButtonClasses}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
        </Button>
        <MonthPicker disabled />
      </div>
      <DetailsSummary />
      <PositionListItems />
    </>
  );
}
