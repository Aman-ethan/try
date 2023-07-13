"use client";

import { Breadcrumb, Row } from "antd";
import { useSelectedLayoutSegment } from "next/navigation";
import Title from "@/components/Typography/Title";
import AddTradeDrawer from "./AddTradeDrawer";
import SelectCustodianWithParams from "../../Input/SelectCustodianWithParams";
import SelectClientWithParams from "../../Input/SelectClientWithParams";
import SelectAssetWithParams from "../../Input/SelectAssetWithParams";
import SelectSecurityWithParams from "./SelectSecurityWithParams";

const BreadcrumbItems = [
  {
    title: "T+1",
  },
];

export default function TradeHeader() {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const title = selectedLayoutSegment?.split("-").join(" ") || "";
  return (
    <div className="space-y-6">
      <Breadcrumb
        className="capitalize"
        items={BreadcrumbItems.concat([
          {
            title,
          },
        ])}
      />
      <Row justify="space-between" align="middle">
        <Title className="capitalize">{title}</Title>
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
        <SelectSecurityWithParams
          size="large"
          className="w-1/5"
          placeholder="Select a Security"
        />
        <SelectAssetWithParams className="w-1/5" placeholder="All Asset" />
      </Row>
    </div>
  );
}
