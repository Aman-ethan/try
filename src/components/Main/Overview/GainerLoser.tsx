"use client";

import { TableColumnsType } from "antd";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IUseTableParams, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import useTable from "@/hooks/useTable";
import Table from "../Table";

interface IGainer {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    asset_class: string;
    base_ccy_invested_amount: number | null;
    base_ccy_realisedpl: number | null;
    base_ccy_unrealisedpl: number;
    ccy: string;
    ccyaccount: string | null;
    client_ccy_realisedpl: string | null;
    client_ccy_unrealisedpl: number;
    client_name: string;
    company_ccy_realisedpl: string | null;
    company_ccy_unrealisedpl: number;
    country: string | null;
    custodian: string;
    distributions: string | null;
    industry: string | null;
    mtm_base_ccy: number;
    mtm_client_ccy: number;
    mtm_company_ccy: number;
    mtm_price: number;
    position_qty: string;
    region: string | null;
    sec_name: string;
    security_id: string;
    total_pl: number;
  }[];
}

interface IGainerLoser {
  client_name: string;
  security_description: string;
  profit_loss: number;
}

export interface ICombinedGainerLoser {
  result: {
    top_gainers: IGainerLoser[];
    top_losers: IGainerLoser[];
    total_gain: number;
    total_loss: number;
  };
}

interface IGainerLoserProps extends IUseTableParams {
  urlKey: string;
}

const Columns: TableColumnsType = [
  {
    title: "Client",
    dataIndex: "client_name",
    key: "client-name",
    width: "14%",
  },
  {
    title: "Security",
    dataIndex: "security_description",
    key: "security",
    width: "42%",
  },
  {
    title: "Custodian Name",
    dataIndex: "custodian_name",
    key: "security",
    width: "26%",
  },
  {
    title: "Total PL",
    dataIndex: "profit_loss",
    key: "total-pl",
    width: "18%",
    render: formatCompactNumber,
  },
];

const _searchParamKeys = [
  "start_date",
  "end_date",
  "client",
  "custodian",
  "reporting_currency",
  "page_gainer",
  "page_loser",
];

function useGainerLoser({ urlKey }: { urlKey: string }) {
  const { get: getSearchParams } = useSearchParams();
  // const duration = getSearchParams("gain_loss_duration");
  const { data, isLoading } = useTransactionServerQuery<IGainer>(
    `${urlKey}${buildURLSearchParams(
      _searchParamKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: getSearchParams(key as SearchParams),
        }),
        {}
      )
    )}`
  );

  return {
    data,
    isLoading,
  };
}

const scroll = { y: "35.75rem" };

export default function GainerLoser({
  urlKey,
  searchParamKeys,
}: IGainerLoserProps) {
  const { data, isLoading } = useGainerLoser({ urlKey });
  const { pagination, onChange } = useTable({ searchParamKeys });
  return (
    <Table
      loading={isLoading}
      columns={Columns}
      dataSource={data?.results}
      scroll={scroll}
      onChange={onChange}
      rowClassName="h-[7rem]"
      className="h-[40.75rem]"
      pagination={{ ...pagination, total: data?.count }}
    />
  );
}
