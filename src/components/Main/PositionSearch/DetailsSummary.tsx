"use client";

import { Card, Col, Row } from "antd";
import useBalanceSheet from "@/hooks/useBalanceSheet";
import { useAnalyticsServerGetQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IBalanceSheetOverview } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import CurrencyTag from "../General/CurrencyTag";
import SummaryCard from "./Common/SummaryCard";
import ChartTable from "./Table/ChartTable";

export default function DetailsSummary() {
  const { get: getSearchParams } = useSearchParams();

  const clientId = getSearchParams("client");

  const { data, isLoading } = useAnalyticsServerGetQuery<IBalanceSheetOverview>(
    (clientId ? `/networth/${clientId}/` : `/networth/`) +
      buildURLSearchParams({
        report_date: getSearchParams("report_date"),
      }),
    {
      keepPreviousData: false,
    }
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
        <CurrencyTag currency={data?.reporting_currency} />
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
            <SummaryCard type="net_worth" value={netWorth} />
            <SummaryCard type="leverage" value={leverage} />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
