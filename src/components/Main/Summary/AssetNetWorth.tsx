"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSummaryParams from "@/hooks/useSummaryParams";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

interface IAssetNetWorthResponse {
  assets: string[];
  data: {
    asset_class: string;
    net_worth: number;
    report_date: string;
    total_sum: number;
  }[];
}

interface IDuration {
  label: string;
  value: ManipulateType | QUnitType;
}

const DURATION: IDuration[] = [
  { label: "1 Week", value: "w" },
  { label: "1 Month", value: "M" },
  { label: "1 Quarter", value: "Q" },
  { label: "1 Year", value: "y" },
];

function useAssetNetWorth() {
  const { selectedDate, selectedDuration } = useSummaryParams();
  const { data, isLoading } = useTransactionServerQuery<IAssetNetWorthResponse>(
    selectedDate && selectedDuration
      ? "/position_history/asset_networth/?" +
          new URLSearchParams({
            to_date: dayjs(selectedDate).toISOString(),
            from_date: dayjs(selectedDate)
              .subtract(1, selectedDuration)
              .toISOString(),
          })
      : null
  );

  return {
    isLoading,
  };
}

export default function AssetNetWorth() {
  const { isLoading } = useAssetNetWorth();
  return <></>;
}
