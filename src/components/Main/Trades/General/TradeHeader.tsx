"use client";

import Title from "@/components/Typography/Title";
import { Breadcrumb, Button, Dropdown, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { CaretDownFilled } from "@ant-design/icons";
import { useState } from "react";
import SelectClient from "../../Input/SelectClientWithParams";
import SelectCustodian from "../../Input/SelectCustodianWithParams";
import AddTradeDrawer from "./AddTradeDrawer";

const TradeRoutes: MenuProps["items"] = [
  {
    key: "blotter-trades",
    label: <Link href="/trades/blotter-trades">Blotter Trades</Link>,
  },
  {
    key: "active-positions",
    label: <Link href="/trades/active-positions">Active Positions</Link>,
  },
];

export default function TradeHeader() {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const title = selectedLayoutSegment?.split("-").join(" ");
  const [dropdownWidth, setDropdownWidth] = useState<undefined | number>(
    undefined
  );
  return (
    <div className="space-y-6">
      <Breadcrumb
        className="capitalize"
        items={[
          {
            title: "Trades",
          },
          {
            title,
          },
        ]}
      />
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
              items: TradeRoutes,
              selectable: true,
              defaultSelectedKeys: [selectedLayoutSegment as string],
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
        <AddTradeDrawer />
      </Row>
      <Row className="max-w-xl gap-x-6">
        <SelectClient placeholder="Select a Client" className="flex-1" />
        <SelectCustodian placeholder="All Custodian" className="flex-1" />
      </Row>
    </div>
  );
}
