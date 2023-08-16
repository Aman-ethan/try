"use client";

import { Skeleton } from "antd";
import useSearchParams from "@/hooks/useSearchParams";
import { IPieData } from "@/constants/pieChartConfig";
import { useAnalyticsServerQuery } from "@/hooks/useQuery";
import useDateRange from "@/hooks/useDateRange";
import Allocation from "./Common/Allocation";

const URLS = {
  get: `/gross-allocation/`,
  post: `/gross-allocation/`,
};

interface IData {
  x_label: string;
  y_label: string;
  data: IPieData[];
  title: string;
}

const useGrossAllocations = () => {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client");
  const custodian_id = getSearchParams("custodian");

  const { startDate, endDate } = useDateRange();

  const { data, isLoading } = useAnalyticsServerQuery<IData[]>(URLS.get, {
    start_date: startDate,
    end_date: endDate,
    client_id,
    custodian_id,
  });

  return {
    data: data as IData[],
    isLoading,
  };
};

export default function GrossAllocations() {
  const { data, isLoading } = useGrossAllocations();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col rounded-lg bg-neutral-1 p-4 tab:p-6 lap:flex-row lap:items-start lap:justify-between">
      {data?.map((item: IData) => (
        <Allocation key={item.title} title={item.title} data={item.data} />
      ))}
    </div>
  );
}
