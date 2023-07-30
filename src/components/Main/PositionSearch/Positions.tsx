"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IPositionSearchResponse } from "@/interfaces/Main";
import CompanyCard from "./CompanyCard";
import ClientPositions from "./ClientPositions";

export default function Positions() {
  const { data, isLoading } =
    useTransactionServerQuery<IPositionSearchResponse>(
      "/position/statement/networth_cards"
    );

  return (
    <div className="space-y-8">
      <CompanyCard companyData={data?.company_card} loading={isLoading} />
      <ClientPositions clients={data?.client_cards} loading={isLoading} />
    </div>
  );
}
