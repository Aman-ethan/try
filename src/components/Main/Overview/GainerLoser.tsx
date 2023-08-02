"use client";

import { TableColumnsType } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import { IDateRange, IUseTableParams, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import useTable from "@/hooks/useTable";
import Title from "@/components/Typography/Title";
import Paragraph from "@/components/Typography/Paragraph";
import Table from "../Table";

dayjs.extend(isBetween);

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
  total_loss?: number;
  total_gain?: number;
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
  title: "gainer" | "loser";
}

const Columns: TableColumnsType = [
  {
    title: "Client",
    dataIndex: "client_name",
    key: "client-name",
    width: "22%",
  },
  {
    title: "Security",
    dataIndex: "security_description",
    key: "security",
    width: "50%",
  },
  {
    title: "Total PL",
    dataIndex: "profit_loss",
    key: "total-pl",
    width: "26%",
    render: formatCompactNumber,
  },
];

const _searchParamKeys = [
  "client",
  "custodian_id",
  "reporting_currency",
  "page_gainer",
  "page_loser",
];

function useGainerLoser({ urlKey }: { urlKey: string }) {
  const { get: getSearchParams } = useSearchParams();
  const { data: dateRange } = useTransactionServerQuery<IDateRange>(
    "/position/history/date/"
  );
  const start_date = getSearchParams("start_date");

  const { data, isLoading } = useTransactionServerQuery<IGainer>(
    dateRange
      ? `${urlKey}${buildURLSearchParams(
          _searchParamKeys.reduce(
            (acc, key) => ({
              ...acc,
              [key]: getSearchParams(key as SearchParams),
            }),
            {
              start_date: dayjs(start_date).isBetween(
                dateRange.start_date,
                dateRange.end_date
              )
                ? start_date
                : dateRange.start_date,
              end_date: dateRange.end_date,
            }
          )
        )}`
      : null
  );

  return {
    data,
    isLoading,
  };
}

const scroll = { y: "30rem" };

export default function GainerLoser({
  title,
  urlKey,
  searchParamKeys,
}: IGainerLoserProps) {
  const { data, isLoading } = useGainerLoser({ urlKey });
  const { pagination, onChange } = useTable({ searchParamKeys });
  const isGainer = title === "gainer";
  return (
    <div className="flex-1 space-y-6 lap:basis-1/2">
      <div className="flex justify-between items-center">
        <Title level={5} className="capitalize">
          {title}
        </Title>
        <Paragraph className="flex items-center gap-x-1.5 text-neutral-13/80">
          {isGainer ? "Top Gain:" : "Top Loss:"}
          <Title level={5}>
            {formatCompactNumber(
              isGainer ? data?.total_gain : data?.total_loss
            )}
          </Title>
        </Paragraph>
      </div>
      <Table
        loading={isLoading}
        columns={Columns}
        dataSource={data?.results}
        scroll={scroll}
        onChange={onChange}
        rowClassName="h-[5rem]"
        className="h-[35rem]"
        pagination={{ ...pagination, total: data?.count }}
      />
    </div>
  );
}
