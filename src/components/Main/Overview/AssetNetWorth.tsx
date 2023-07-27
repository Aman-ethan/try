"use client";

import { useAnalyticsServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IAssetNetWorth } from "@/interfaces/Main";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import ClientDropdwon from "../General/ClientDropdown";
import IndexChart from "./IndexChart";

dayjs.extend(quarterOfYear);

export default function AssetNetWorth() {
  const { get: getSearchParams } = useSearchParams();
  const { data, isLoading } = useAnalyticsServerQuery<IAssetNetWorth>(
    "/relative-performance/net-worth/",
    {
      client: getSearchParams("client"),
    }
  );
  console.log(data);
  return (
    <div className="space-y-3">
      <ClientDropdwon />
      <IndexChart data={data?.data} loading={isLoading} />
    </div>
  );
}
