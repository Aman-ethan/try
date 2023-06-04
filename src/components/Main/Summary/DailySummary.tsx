"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";

interface IDailySummaryResponse {
  client_id: number;
  client_name: string;
  net_worth: number;
  total_pl: number;
}

function useDailySummary() {
  const { getSearchParams } = useSearchParams();
  const selectedDate = getSearchParams("selected_date");
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
