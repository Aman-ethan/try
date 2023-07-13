"use client";

import { Card, Col, Row } from "antd";
import CurrencyTag from "../General/CurrencyTag";
import AssetChart from "./Table/AssetChart";
import LiabilityChart from "./Table/LiabilityChart";
import SummaryCard from "./Common/SummaryCard";

export default function DetailsSummary() {
  return (
    <Card>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-medium tab:text-2xl">Overview</h2>
        <CurrencyTag currency="sgd" />
      </div>
      <Row className="flex flex-col lap:flex-row lap:justify-between lap:space-x-4">
        <Col className="flex-1">
          <AssetChart />
        </Col>
        <Col className="flex-1 ">
          <LiabilityChart />
          <div className="flex space-x-4">
            <SummaryCard type="Net Worth" value={36.6} />
            <SummaryCard type="Leverage" value={0.06} />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
