"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IPositionSearchResponse } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useReportDate from "@/hooks/useReportDate";
import CompanyCard from "./CompanyCard";
import ClientPositions from "./ClientPositions";

export default function Positions() {
  const reportDate = useReportDate();
  const { data, isLoading } =
    useTransactionServerQuery<IPositionSearchResponse>(
      `/statement/position/networth_cards/${buildURLSearchParams({
        report_date: reportDate,
      })}`
    );

  return (
    <div className="space-y-6 even:bg-white even:p-6">
      <CompanyCard companyData={data?.company_card} loading={isLoading} />
      <ClientPositions clients={data?.client_cards} loading={isLoading} />
    </div>
  );
}
