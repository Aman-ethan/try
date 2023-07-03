"use client";

import { Breadcrumb, Button, Dropdown, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { CaretDownFilled } from "@ant-design/icons";
import { useState } from "react";
import Title from "@/components/Typography/Title";
import SelectClient from "../../General/SelectClientWithParams";
import SelectCustodian from "../../General/SelectCustodianWithParams";
import Select from "../../Input/Select";

const CrudeRoutes: MenuProps["items"] = [
  {
    key: "gross-allocations",
    label: <Link href="/crude/gross-allocations">Gross Allocations</Link>,
  },
  {
    key: "relative-performance",
    label: <Link href="/crude/relative-performance">Relative Performance</Link>,
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
      title: "Trades",
    },
  ];

  selectedLayoutSegment.forEach((segment) => {
    items.push({
      title: segment,
    });
  });

  return (
    <div className="space-y-6">
      <Breadcrumb className="capitalize" items={items} />
      <Row justify="space-between" align="middle">
        {isPositions ? (
          <Title className="capitalize">{title}</Title>
        ) : (
          <Row justify="space-between" align="middle">
            <Row
              ref={(el) => {
                setDropdownWidth(el?.getBoundingClientRect().width);
              }}
              align="middle"
              className="space-x-2"
            >
              <Title className="capitalize">{title}</Title>
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
      <Row className="max-w-xl gap-x-6">
        {isPositions ? (
          <Row className="flex-1 content-center items-center">
            <h2 className="text-xl">Asset Class</h2>
            <Select
              placeholder="Select Asset Class"
              className="ml-2 flex-1"
              options={options}
            />
          </Row>
        ) : (
          <>
            <SelectClient placeholder="Select a Client" className="flex-1" />
            <SelectCustodian placeholder="All Custodian" className="flex-1" />
          </>
        )}
      </Row>
    </div>
  );
}