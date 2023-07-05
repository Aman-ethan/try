"use client";

import { Breadcrumb, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Title from "@/components/Typography/Title";
import Dropdown from "../../General/Dropdown";
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
        <Dropdown
          menu={{
            items: TradeRoutes,
            defaultSelectedKeys: [selectedLayoutSegment as string],
          }}
        >
          <Title className="capitalize">{title}</Title>
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
