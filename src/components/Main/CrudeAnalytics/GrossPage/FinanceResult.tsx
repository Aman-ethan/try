"use client";

import { Skeleton } from "antd";
import { useEffect } from "react";
import useSearchParams from "@/hooks/useSearchParams";
import { useAnalyticsServerQuery } from "@/hooks/useQuery";
import revalidate from "@/lib/revalidate";
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
    client_id,
    custodian_id,
    start_date,
    end_date,
  };
};

export default function FinanceResult() {
  const {
    data,
    netWorthData,
    isLoading,
    netWorthLoading,
    client_id,
    custodian_id,
    start_date,
    end_date,
  } = useFinanceChart();

  useEffect(() => {
    revalidate(URLS.ProfitAndLoss, false);
    revalidate(URLS.netWorth, false);
  }, [client_id, custodian_id, start_date, end_date]);

  if (isLoading || netWorthLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-6 h-[25.5rem]">
      <div className="flex flex-col gap-10 lap:flex-row ">
        <FinanceChart title={data?.title} data={data?.data} />
        <FinanceChart title={netWorthData?.title} data={netWorthData?.data} />
      </div>
    </div>
  );
}
