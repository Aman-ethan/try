"use client";

import { useLayoutEffect } from "react";
import { Skeleton } from "antd";
import useSearchParams from "@/hooks/useSearchParams";
import { IPieData } from "@/constants/pieChartConfig";
import { useAnalyticsServerQuery } from "@/hooks/useQuery";
import revalidate from "@/lib/revalidate";
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
  const start_date = getSearchParams("start_date");
  const end_date = getSearchParams("end_date");

  const { data, isLoading } = useAnalyticsServerQuery<IData[]>(URLS.get, {
    start_date,
    end_date,
    client_id,
    custodian_id,
  });

  return {
    data: data as IData[],
    isLoading,
    client_id,
    custodian_id,
    start_date,
    end_date,
  };
};

export default function GrossAllocations() {
  const { data, isLoading, client_id, custodian_id, start_date, end_date } =
    useGrossAllocations();

  useLayoutEffect(() => {
    revalidate(URLS.get, false);
  }, [client_id, custodian_id, start_date, end_date]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col rounded-lg bg-neutral-1 p-6 lap:flex-row lap:items-center lap:justify-center">
      {data?.map((item: IData) => (
        <Allocation key={item.title} title={item.title} data={item.data} />
      ))}
    </div>
  );
}
