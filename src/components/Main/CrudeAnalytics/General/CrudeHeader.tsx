"use client";

import { Breadcrumb, Button, Dropdown, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { CaretDownFilled, FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import clsx from "clsx";
import Title from "@/components/Typography/Title";
import SelectClient from "../../Input/SelectClientWithParams";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import Select from "../../../Input/Select";

const CrudeRoutes: MenuProps["items"] = [
  {
    key: "gross-allocations",
    label: (
      <Link href="/analytics/crude/gross-allocations">Gross Allocations</Link>
    ),
  },
  {
    key: "relative-performance",
    label: (
      <Link href="/analytics/crude/relative-performance">
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
  const selectedLayoutSegment = useSelectedLayoutSegments();
  const title = selectedLayoutSegment[selectedLayoutSegment.length - 1]
    ?.split("-")
    .join(" ");
  const [dropdownWidth, setDropdownWidth] = useState<undefined | number>(
    undefined
  );
  const isPositions = title === "positions";

  const items = [
    {
      title: "Analytics",
    },
  ];

  selectedLayoutSegment.forEach((segment) => {
    items.push({
      title: segment.split("-").join(" "),
    });
  });

  const selectClassName = clsx(showFilter ? "block" : "hidden", "tab:flex");

  return (
    <div className="space-y-6">
      <Breadcrumb className="capitalize" items={items} />
      <Row justify="space-between" align="middle">
        {isPositions ? (
          <Title className="capitalize font-semibold">{title}</Title>
        ) : (
          <Row justify="space-between" align="middle">
            <Row
              ref={(el) => {
                setDropdownWidth(el?.getBoundingClientRect().width);
              }}
              align="middle"
              className="space-x-2"
            >
              <Title level={2} className="capitalize font-semibold">
                {title}
              </Title>
              <Dropdown
                menu={{
                  items: CrudeRoutes,
                  selectable: true,
                  defaultSelectedKeys: [selectedLayoutSegment[0] as string],
                  style: {
                    width: dropdownWidth,
                  },
                }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={<CaretDownFilled className="mt-0.5 text-xl" />}
                />
              </Dropdown>
            </Row>
          </Row>
        )}
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
        <div className="flex max-w-xl flex-col space-y-4 tab:flex-row tab:items-center tab:space-x-4 tab:space-y-0">
          <SelectClient
            placeholder="Select a Client"
            className={selectClassName}
          />
          <SelectCustodian
            placeholder="All Custodian"
            className={selectClassName}
          />
          <Button
            size="large"
            icon={<FilterOutlined />}
            className="order-first mb-4 block tab:hidden"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters
          </Button>
        </div>
      )}
    </div>
  );
}
