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
        <h2 className="text-2xl font-medium">Overview</h2>
        <CurrencyTag currency="sgd" />
      </div>
      <Row gutter={[24, 8]}>
        <Col span={12}>
          <AssetChart />
        </Col>
        <Col span={12} className="space-y-8">
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
