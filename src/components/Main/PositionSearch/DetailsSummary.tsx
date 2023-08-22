"use client";

import { Card, Col, Row } from "antd";
import { useMediaQuery } from "@mantine/hooks";
import useBalanceSheet from "@/hooks/useBalanceSheet";
import { useAnalyticsServerGetQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IBalanceSheetOverview } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import Title from "@/components/Typography/Title";
import CurrencyTag from "../General/CurrencyTag";
import SummaryCard from "./Common/SummaryCard";
import ChartTable from "./Table/ChartTable";

const URLs = {
  get: "/networth/",
};

export default function DetailsSummary() {
  const { get: getSearchParams } = useSearchParams();

  const clientId = getSearchParams("client");
  const custodianId = getSearchParams("custodian");

  if (clientId) {
    URLs.get = `/networth/${clientId}/`;
  }

  if (clientId && custodianId) {
    URLs.get += `${custodianId}/`;
  }
  const { data, isLoading } = useAnalyticsServerGetQuery<IBalanceSheetOverview>(
    URLs.get +
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
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 768px)");

  return (
    <Card className="p-4 tab:p-8">
      <div className="mb-4 flex justify-between">
        <Title
          level={MOBILE_BREAK_POINT ? 4 : 3}
          className="text-xl font-regular tab:text-2xl"
        >
          Overview
        </Title>
        <CurrencyTag currency={data?.reporting_currency} />
      </div>
      <Row className="flex flex-col lap:flex-row lap:justify-between lap:space-x-6">
        <Col className="flex-1">
          <ChartTable
            loading={isLoading}
            data={data?.asset}
            progressType="success"
            total={totalAsset}
            percentage={assetPercentage}
          />
        </Col>
        <Col className="flex-1 flex flex-col space-between">
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
