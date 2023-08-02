"use client";

import { Skeleton } from "antd";
import useSearchParams from "@/hooks/useSearchParams";
import { useAnalyticsServerQuery } from "@/hooks/useQuery";
import FinanceChart from "./Common/FinanceChart";

const URLS = {
  netWorth: `/gross-allocation/networth/`,
  ProfitAndLoss: `/gross-allocation/pl-history/`,
};

type TResponseData = {
  asset_class: string;
  date: string;
  value: number;
};

type TData = {
  title: string;
  x_label: string;
  y_label: string;
  data: TResponseData[];
};

const useFinanceChart = () => {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client");
  const custodian_id = getSearchParams("custodian");
  const start_date = getSearchParams("start_date");
  const end_date = getSearchParams("end_date");

  const { data, isLoading } = useAnalyticsServerQuery<TData>(
    URLS.ProfitAndLoss,
    {
      start_date,
      end_date,
      client_id,
      custodian_id,
    }
  );

  const { data: netWorthData, isLoading: netWorthLoading } =
    useAnalyticsServerQuery<TData>(URLS.netWorth, {
      start_date,
      end_date,
      client_id,
      custodian_id,
    });

  return {
    data: data as TData,
    netWorthData: netWorthData as TData,
    isLoading,
    netWorthLoading,
  };
};

export default function FinanceResult() {
  const { data, netWorthData, isLoading, netWorthLoading } = useFinanceChart();

  if (isLoading || netWorthLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-6 rounded-lg bg-neutral-1 p-6">
      <div className="flex flex-col gap-10 lap:flex-row">
        <FinanceChart title="Net Worth" data={netWorthData?.data} />
        <FinanceChart title="P/L History" data={data?.data} />
      </div>
    </div>
  );
}
