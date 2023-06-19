"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Button, Card, Row } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import IndexChart from "./IndexChart";

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

const DURATION_AMOUNT = 1;

function useAssetNetWorth() {
  const { get: getSearchParams } = useSearchParams();
  const selectedDate = getSearchParams("selected_date");
  const selectedDuration = getSearchParams(
    "selected_duration"
  ) as ManipulateType;
  const clientName = getSearchParams("client_name");
  const clientId = getSearchParams("client_id");

  const { data, isLoading } = useTransactionServerQuery<IAssetNetWorthResponse>(
    selectedDate && selectedDuration && clientId
      ? "/position_history/asset_networth/" +
          buildURLSearchParams({
            to_date: dayjs(selectedDate).toISOString(),
            from_date: dayjs(selectedDate)
              .subtract(DURATION_AMOUNT, selectedDuration)
              .toISOString(),
            client_id: clientId,
          })
      : null
  );

  return {
    isLoading,
    data:
      data?.data?.map(({ report_date, net_worth, asset_class }) => ({
        x: report_date,
        y: net_worth,
        z: asset_class,
      })) || [],
    clientName,
  };
}

function Extra() {
  const { updateSearchParams, get: getSearchParams } = useSearchParams();
  const selectedDuration = getSearchParams("selected_duration");

  function onClick(value: string) {
    return () => {
      updateSearchParams({
        selected_duration: value,
      });
    };
  }

  return (
    <Row>
      {DURATION.map(({ label, value }) => (
        <Button
          onClick={onClick(value)}
          type={selectedDuration === value ? "link" : "text"}
          key={value}
        >
          {label}
        </Button>
      ))}
    </Row>
  );
}

export default function AssetNetWorth() {
  const { isLoading, data, clientName } = useAssetNetWorth();

  return (
    <Card
      bordered={false}
      extra={<Extra />}
      title={clientName}
      className="rounded-l-none h-full"
    >
      <IndexChart data={data} />
    </Card>
  );
}
