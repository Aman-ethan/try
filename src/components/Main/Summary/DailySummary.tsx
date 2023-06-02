"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSummaryParams from "@/hooks/useSummaryParams";

interface IDailySummaryResponse {
  client_id: number;
  client_name: string;
  net_worth: number;
  total_pl: number;
}

function useDailySummary() {
  const { selectedDate } = useSummaryParams();
  const { data, isLoading } = useTransactionServerQuery<
    IDailySummaryResponse[]
  >(
    selectedDate
      ? `/position_history/summary/daily/?` +
          new URLSearchParams({ report_date: selectedDate })
      : null
  );
  return {
    isLoading,
  };
}

export default function DailySummary() {
  const { isLoading } = useDailySummary();

  if (isLoading) return <></>;
  return <></>;
}
