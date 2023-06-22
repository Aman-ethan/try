"use client";

import Title from "@/components/Typography/Title";
import { Breadcrumb, Dropdown, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import SelectClient from "../../Input/SelectClient";
import SelectCustodian from "../../Input/SelectCustodian";
import { CaretDownFilled } from "@ant-design/icons";
import AddTradeDrawer from "./AddTradeDrawer";

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
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const title = selectedLayoutSegment?.split("-").join(" ");
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
            defaultSelectedKeys: [selectedLayoutSegment as string],
          }}
          trigger={["click"]}
        >
          <button className="flex gap-x-3 items-center">
            <Title className="capitalize">{title}</Title>
            <CaretDownFilled />
          </button>
        </Dropdown>
        <AddTradeDrawer />
      </Row>
      <Row className="max-w-xl gap-x-6">
        <SelectClient placeholder="Select a Client" className="flex-1" />
        <SelectCustodian placeholder="All Custodian" className="flex-1" />
      </Row>
    </div>
  );
}
