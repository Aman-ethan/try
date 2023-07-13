import { useState } from "react";
import Title from "@/components/Typography/Title";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import clsx from "clsx";
import DetailsSummary from "./DetailsSummary";
import PositionListItems from "./PositionListItems";
import SelectClient from "../Input/SelectClientWithParams";
import SelectCustodian from "../Input/SelectCustodianWithParams";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";
import SelectAssetClass from "../Input/SelectAssetClass";

export default function PositionList() {
  const [collapse, setCollapse] = useState(false);

  const containerClasses =
    "flex flex-col tab:flex-row tab:items-center tab:space-x-4";
  const innerContainerClasses =
    "flex flex-1 flex-col space-y-4 tab:flex-row tab:items-center tab:space-x-4 tab:space-y-0";
  const filterButtonClasses =
    "order-first mb-4 tab:order-last tab:mb-0 tab:self-start lap:hidden";

  const primarySelectClasses = clsx(
    collapse ? "block" : "hidden",
    "flex-1 tab:flex"
  );

  const secondarySelectClasses = clsx(
    collapse ? "block" : "hidden",
    "flex-1 lap:flex"
  );

  return (
    <>
      <Title className="text-2xl tab:text-3xl">Position List</Title>
      <div className={containerClasses}>
        <div className={innerContainerClasses}>
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
          <div className={innerContainerClasses}>
            <SelectRelationshipNumber
              placeholder="Relationship Number"
              className={secondarySelectClasses}
            />
            <SelectAssetClass
              placeholder="Asset Class"
              className={secondarySelectClasses}
            />
          </div>
        </div>
        <Button
          size="large"
          icon={<FilterOutlined />}
          className={filterButtonClasses}
          onClick={() => setCollapse(!collapse)}
        >
          Filters
        </Button>
      </div>
      <DetailsSummary />
      <PositionListItems />
    </>
  );
}
