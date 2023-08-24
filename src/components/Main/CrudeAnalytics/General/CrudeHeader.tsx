"use client";

import { CaretDownFilled, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Row } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Title from "@/components/Typography/Title";
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

export default function CrudeHeader() {
  const [showFilter, setShowFilter] = useState(false);
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const title = selectedLayoutSegment?.split("-").join(" ");
  const [dropdownWidth, setDropdownWidth] = useState<undefined | number>(
    undefined
  );

  return (
    <div className="space-y-4 tab:space-y-6">
      <Row justify="space-between" align="middle">
        <Row
          ref={(el) => {
            setDropdownWidth(el?.getBoundingClientRect().width);
          }}
          align="middle"
          className="gap-1"
        >
          <Title level={2}>{title}</Title>
          <Dropdown
            menu={{
              items: CrudeRoutes,
              selectable: true,
              selectedKeys: [selectedLayoutSegment as string],
              style: {
                width: dropdownWidth,
              },
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              className="flex items-center justify-center"
              icon={<CaretDownFilled className="text-xl" />}
            />
          </Dropdown>
        </Row>
        <Button
          size="large"
          icon={<FilterOutlined />}
          className="block tab:hidden"
          onClick={() => setShowFilter(!showFilter)}
        />
      </Row>
      <div
        className={clsx(
          "flex flex-col gap-2 tab:gap-6 tab:flex tab:flex-row tab:items-center lap:gap-4 lap:max-w-[39.125rem]",
          showFilter ? "block" : "hidden"
        )}
      >
        <SelectClient placeholder="All Clients" />
        <SelectCustodian placeholder="All Custodian" />
      </div>
    </div>
  );
}
