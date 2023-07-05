"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { Row, Segmented } from "antd";
import dayjs, { ManipulateType, QUnitType } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import useSelectClientWithParams from "@/hooks/useSelectClientWithParams";
import { DATE_PARAM_FORMAT } from "@/constants/format";
import { SegmentedValue } from "antd/es/segmented";
import Title from "@/components/Typography/Title";
import IndexChart from "./IndexChart";
import Dropdown from "../General/Dropdown";

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
  const { updateSearchParams, get: getSearchParams } = useSearchParams();
  const {
    clientId,
    isLoading: isClientLoading,
    options: clientOptions,
    onChange: onClientChange,
  } = useSelectClientWithParams();
  const assetDuration = getSearchParams("asset_duration") as ManipulateType;

  const { data, isLoading } = useTransactionServerQuery<IAssetNetWorthResponse>(
    `/position_history/asset_networth/${buildURLSearchParams({
      client_id: clientId,
      asset_duration: dayjs()
        .subtract(DURATION_AMOUNT, assetDuration)
        .format(DATE_PARAM_FORMAT),
    })}`
  );

  const selectedClient =
    clientOptions.find(({ value }) => value === clientId) || clientOptions[0];

  function onDurationChange(value: SegmentedValue) {
    updateSearchParams({
      asset_duration: value,
    });
  }

  return {
    isLoading,
    isClientLoading,
    data:
      data?.data?.map(({ report_date, net_worth, asset_class }) => ({
        x: report_date,
        y: net_worth,
        z: asset_class,
      })) || [],
    selectedClient,
    clientOptions,
    assetDuration,
    onClientChange,
    onDurationChange,
  };
}

export default function AssetNetWorth() {
  const {
    data,
    isLoading,
    selectedClient,
    isClientLoading,
    clientOptions,
    assetDuration,
    onClientChange,
    onDurationChange,
  } = useAssetNetWorth();

  return (
    <>
      <Row justify="space-between">
        <Dropdown
          disabled={isClientLoading}
          menu={{
            onClick: ({ key }) => {
              onClientChange(key);
            },
            items: clientOptions,
            defaultSelectedKeys: [selectedClient?.key as string],
          }}
        >
          <Title level={4}>{selectedClient?.label}</Title>
        </Dropdown>
        <Segmented
          onChange={onDurationChange}
          options={DURATION}
          defaultValue={assetDuration}
        />
      </Row>
      <IndexChart loading={isLoading} data={data} />
    </>
  );
}
