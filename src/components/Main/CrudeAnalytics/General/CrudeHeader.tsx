"use client";

import { CaretDownFilled, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Row } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Title from "@/components/Typography/Title";
import Select from "../../../Input/Select";
import SelectClient from "../../Input/SelectClientWithParams";
import SelectCustodian from "../../Input/SelectCustodianWithParams";

const CrudeRoutes: MenuProps["items"] = [
  {
    key: "gross-allocations",
    label: (
      <Link href="/analytics/preset/gross-allocations">Gross Allocations</Link>
    ),
  },
  {
    key: "relative-performance",
    label: (
      <Link href="/analytics/preset/relative-performance">
        Relative Performance
      </Link>
    ),
  },
];

const options = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Equity",
    value: "equity",
  },
];

export default function CrudeHeader() {
  const [showFilter, setShowFilter] = useState(false);
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const title = selectedLayoutSegment?.split("-").join(" ");

  const isPositions = title === "positions";

  const selectClassName = clsx(
    showFilter ? "block" : "hidden",
    "tab:flex-1 tab:flex"
  );

  return (
    <div className="space-y-6">
      <Row justify="space-between" align="middle">
        {isPositions ? (
          <Title className="capitalize">{title}</Title>
        ) : (
          <Dropdown
            menu={{
              items: CrudeRoutes,
              selectable: true,
              selectedKeys: [selectedLayoutSegment as string],
            }}
            trigger={["click"]}
            className="space-x-3 -ml-4"
          >
            <Button type="text" size="large" className="flex items-center">
              <Title level={2}>{title}</Title>
              <CaretDownFilled className="mt-2 text-xl" />
            </Button>
          </Dropdown>
        )}
        <Button
          size="large"
          icon={<FilterOutlined />}
          className="block tab:hidden"
          onClick={() => setShowFilter(!showFilter)}
        />
      </Row>
      {isPositions ? (
        <Row className="max-w-xl gap-x-6">
          <Row className="flex-1 content-center items-center">
            <h2 className="text-xl">Asset Class</h2>
            <Select
              placeholder="Select Asset Class"
              className="ml-2 flex-1"
              options={options}
            />
          </Row>
        </Row>
      ) : (
        <div className="flex w-full flex-col lap:max-w-lg">
          <div className="flex flex-col space-y-2 tab:flex-row tab:items-center tab:space-x-4 tab:space-y-0">
            <SelectClient
              placeholder="All Clients"
              className={selectClassName}
            />
            <SelectCustodian
              placeholder="All Custodian"
              className={selectClassName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
