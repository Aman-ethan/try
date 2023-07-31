"use client";

import { useState } from "react";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IPositionSearchResponse } from "@/interfaces/Main";
import CompanyCard from "./CompanyCard";
import ClientPositions from "./ClientPositions";

export default function Positions() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const endpoint = selectedMonth
    ? `/statement/position/networth_cards?date=${selectedMonth}`
    : "/statement/position/networth_cards";
  const { data, isLoading } =
    useTransactionServerQuery<IPositionSearchResponse>(endpoint);

  return (
    <div className="space-y-8">
      <CompanyCard companyData={data?.company_card} loading={isLoading} />
      <ClientPositions
        clients={data?.client_cards}
        loading={isLoading}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  );
}
