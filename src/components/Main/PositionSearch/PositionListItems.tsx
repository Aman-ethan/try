"use client";

import { Button, Card } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import clsx from "clsx";
import { useMediaQuery } from "@mantine/hooks";
import Select from "@/components/Input/Select";
import usePositions from "@/hooks/usePositions";
import useSearchParams from "@/hooks/useSearchParams";
import ListView from "./General/ListView";
import Segmented from "../General/Segmented";
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

  const LAPTOP_BREAK_POINT = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <div className="flex flex-col space-y-4 tab:flex-row tab:justify-between tab:space-x-4 tab:space-y-0">
        <div className="space-between flex w-full items-center space-x-2 tab:w-2/5">
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
              updateSearchParams({ asset_class: value, page: undefined })
            }
          />
        </div>
      </div>
      <Card className="p-4">
        <div className={listItemsClasses}>
          <div className="flex w-full flex-col gap-y-4 tab:flex-row tab:justify-between">
            <div>
              <h2 className="w-1/3 text-xl font-medium desk:text-2xl">
                Positions
              </h2>
            </div>
            <div className="flex items-center justify-start gap-x-4 tab:mr-[65px] lap:hidden">
              <p className="w-2/12 tab:w-1/4">Sort by</p>
              <Select
                placeholder="Choose sort option"
                className="w-full"
                options={Options}
                onChange={onSegmentChange}
                size="large"
              />
            </div>
          </div>
          <Segmented
            size={LAPTOP_BREAK_POINT ? "large" : "middle"}
            primary={false}
            options={Options}
            className="hidden lap:block"
            onChange={onSegmentChange}
          />
        </div>
        <div className="desk:mt-8">
          <ListView />
        </div>
      </Card>
    </>
  );
}
