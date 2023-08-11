"use client";

import { Button, Card, Segmented } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import clsx from "clsx";
import Select from "@/components/Input/Select";
import usePositions from "@/hooks/usePositions";
import useSearchParams from "@/hooks/useSearchParams";
import ListView from "./General/ListView";
import SelectRelationshipNumber from "../Input/SelectRelationshipNumber";
import SearchPositionSecurities from "../Input/SearchPositionSecurities";
import ClientAssetSelect from "../Input/ClientAssetSelect";

export default function PositionListItems() {
  const { updateSearchParams } = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const {
    client: clientId,
    custodian: custodianId,
    onSegmentChange,
  } = usePositions();

  const SortOptionsMap: Record<string, string> = {
    "Largest Position First": "-market_value",
    "Smallest Position First": "market_value",
    "Most Profitable Positions First": "-unrealised_pl",
    "Most Loss Making First": "unrealised_pl",
  };

  const Options = Object.keys(SortOptionsMap).map((option) => ({
    label: option,
    value: SortOptionsMap[option],
  }));

  const listItemsClasses =
    "mb-4 flex flex-col space-y-6 tab:flex-row tab:justify-between tab:items-center tab:space-y-0 lap:flex-col lap:items-stretch lap:space-y-4";
  const filterButtonClasses = "tab:hidden";

  const primarySelectClasses = clsx(
    showFilter ? "block" : "hidden",
    "w-full tab:flex"
  );
  return (
    <>
      <div className="flex flex-col space-y-4 tab:flex-row tab:space-x-4 tab:space-y-0">
        <div className="space-between flex w-full items-center space-x-2 tab:w-1/3">
          <SearchPositionSecurities
            placeholder="Search security name or id"
            className="w-full"
          />
          <Button
            size="large"
            icon={<FilterOutlined />}
            className={filterButtonClasses}
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
        <div className="flex flex-1 flex-col items-center space-y-4 tab:flex-row tab:space-x-4 tab:space-y-0">
          <SelectRelationshipNumber
            disabled={!clientId}
            params={{ clientId, custodianId }}
            placeholder="Select Account Number"
            className={primarySelectClasses}
          />
          <ClientAssetSelect
            placeholder="Select Asset Class"
            className={primarySelectClasses}
            onChange={(value: string) =>
              updateSearchParams({ asset_class: value })
            }
          />
        </div>
      </div>
      <Card>
        <div className={listItemsClasses}>
          <h2 className="text-xl font-medium">Positions</h2>
          <Select
            placeholder="Choose sort option"
            className="flex w-auto lap:hidden"
            options={Options}
            onChange={onSegmentChange}
          />
          <Segmented
            block
            options={Options}
            className="hidden lap:block"
            onChange={onSegmentChange}
          />
        </div>
        <div>
          <ListView />
        </div>
      </Card>
    </>
  );
}
