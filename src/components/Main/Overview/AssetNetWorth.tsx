"use client";

import Title from "@/components/Typography/Title";
import useClientDropdown from "@/hooks/useClientDropdown";
import { Row } from "antd";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import Dropdown from "../General/Dropdown";
import IndexChart from "./IndexChart";

dayjs.extend(quarterOfYear);

interface IAssetNetWorthResponse {
  asset_class: string;
  net_worth: number;
  report_date: string;
  total_sum: number;
}

export default function AssetNetWorth() {
  const { isClientLoading, clientOptions, selectedClient, onClientChange } =
    useClientDropdown<IAssetNetWorthResponse>({
      urlKey: "/position_history/asset_networth/",
      mapper: ({ report_date, net_worth, asset_class }) => ({
        x: report_date,
        y: net_worth,
        z: asset_class,
      }),
    });

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
      </Row>
      <IndexChart />
    </>
  );
}
