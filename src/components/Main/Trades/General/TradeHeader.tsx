"use client";

import { Breadcrumb, Input, MenuProps, Row } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Title from "@/components/Typography/Title";
import Dropdown from "../../General/Dropdown";
import AddTradeDrawer from "./AddTradeDrawer";
import SelectCustodianWithParams from "../../Input/SelectCustodianWithParams";
import SelectClientWithParams from "../../Input/SelectClientWithParams";
import SelectAssetClass from "../../Input/SelectAssetClass";

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
      <Row justify="end" align="middle">
        {/* <Dropdown
          menu={{
            items: TradeRoutes,
            defaultSelectedKeys: [selectedLayoutSegment as string],
          }}
        >
          <Title className="capitalize">{title}</Title>
        </Dropdown> */}
        <AddTradeDrawer />
      </Row>
      <Row className="gap-x-6 justify-between">
        <SelectClientWithParams
          placeholder="Select a Client"
          className="w-1/4"
        />
        <SelectCustodianWithParams
          placeholder="All Custodian"
          className="w-1/4"
        />
        <Input size="large" className="w-1/5" placeholder="Enter Security ID" />
        <SelectAssetClass className="w-1/5" placeholder="All Asset" />
      </Row>
    </div>
  );
}
