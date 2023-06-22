"use client";

import Title from "@/components/Typography/Title";
import { Breadcrumb, Button, Dropdown, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import SelectClient from "../../Input/SelectClient";
import SelectCustodian from "../../Input/SelectCustodian";
import { CaretDownFilled } from "@ant-design/icons";

const TradeRoutes: MenuProps["items"] = [
  {
    key: "blotter-trades",
    label: <Link href="blotter-trades">Blotter Trades</Link>,
  },
  {
    key: "active-positions",
    label: <Link href="active-positions">Active Positions</Link>,
  },
];

export default function TradeHeader() {
  const layoutSegment = useSelectedLayoutSegment();
  const title = layoutSegment?.split("-").join(" ");
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
      <Row justify="space-between">
        <Dropdown
          menu={{
            items: TradeRoutes,
            selectable: true,
            defaultSelectedKeys: [layoutSegment as string],
          }}
          trigger={["click"]}
        >
          <button className="flex gap-x-3 items-center">
            <Title className="capitalize">{title}</Title>
            <CaretDownFilled />
          </button>
        </Dropdown>
        <Button type="primary" size="large">
          Add Blotter Trade
        </Button>
      </Row>
      <Row className="max-w-xl gap-x-6">
        <SelectClient placeholder="Select a Client" className="flex-1" />
        <SelectCustodian placeholder="All Custodian" className="flex-1" />
      </Row>
    </div>
  );
}
