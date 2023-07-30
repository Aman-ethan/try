"use client";

import { Card, Col, Row } from "antd";
import { useParams } from "next/navigation";
import useBalanceSheet from "@/hooks/useBalanceSheet";
import { useAnalyticsServerGetQuery } from "@/hooks/useQuery";
import { IBalanceSheetOverview } from "@/interfaces/Main";
import CurrencyTag from "../General/CurrencyTag";
import SummaryCard from "./Common/SummaryCard";
import ChartTable from "./Table/ChartTable";

export default function DetailsSummary() {
  const { client_id } = useParams();

  const { data, isLoading } = useAnalyticsServerGetQuery<IBalanceSheetOverview>(
    client_id ? `/networth/${client_id}/` : null
  );

  const {
    totalAsset,
    totalLiability,
    leverage,
    netWorth,
    assetPercentage,
    liabilityPercentage,
  } = useBalanceSheet({ data });

  return (
    <Card>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-medium tab:text-2xl">Overview</h2>
        <CurrencyTag currency="sgd" />
      </div>
      <Row className="flex flex-col lap:flex-row lap:justify-between lap:space-x-8">
        <Col className="flex-1">
          <ChartTable
            loading={isLoading}
            data={data?.asset}
            progressType="success"
            total={totalAsset}
            percentage={assetPercentage}
          />
        </Col>
        <Col className="flex-1 space-y-8">
          <ChartTable
            loading={isLoading}
            data={data?.liability}
            progressType="failure"
            total={totalLiability}
            percentage={liabilityPercentage}
          />
          <div className="flex space-x-4">
            <SummaryCard type="Net Worth" value={netWorth} />
            <SummaryCard type="Leverage" value={leverage} />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
