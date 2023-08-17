"use client";

import { useSessionStorage } from "@mantine/hooks";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IPositionSearchResponse } from "@/interfaces/Main";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import CompanyCard from "./CompanyCard";
import ClientPositions from "./ClientPositions";

export default function Positions() {
  const { get: getSearchParams } = useSearchParams();
  const [reportDate] = useSessionStorage<string>({
    key: "reportDate",
  });
  const { data, isLoading } =
    useTransactionServerQuery<IPositionSearchResponse>(
      `/statement/position/networth_cards/${buildURLSearchParams({
        report_date: getSearchParams("report_date") || reportDate,
      })}`
    );

  return (
    <div className="space-y-6 even:bg-white even:p-6">
      <CompanyCard companyData={data?.company_card} loading={isLoading} />
      <ClientPositions clients={data?.client_cards} loading={isLoading} />
    </div>
  );
}
