"use client";

import { TableColumnsType } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import {
  IDateRange,
  IUseTableParams,
  SearchParams,
  TGainerLoser,
} from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import useTable from "@/hooks/useTable";
import Title from "@/components/Typography/Title";
import ClampedText from "@/components/Typography/ClampedText";
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
  type: TGainerLoser;
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
    render: (description) => <ClampedText text={description} />,
  },
  {
    title: "Total PL",
    dataIndex: "profit_loss",
    key: "total-pl",
    width: "26%",
    render: formatCompactNumber,
    align: "right",
  },
];

const _searchParamKeys = ["client", "custodian_id", "reporting_currency"];

const searchParamKeys: Record<TGainerLoser, Record<"page", SearchParams>> = {
  gainer: {
    page: "page_gainer",
  },
  loser: {
    page: "page_loser",
  },
};

const URLs = {
  gainer: "/position/history/top_gainer/",
  loser: "/position/history/top_loser/",
};

const TABLE_ROW_NUM = 5;

function useGainerLoser({ type }: IGainerLoserProps) {
  const { get: getSearchParams } = useSearchParams();
  const { data: dateRange } = useTransactionServerQuery<IDateRange>(
    "/position/history/date/"
  );
  const start_date = getSearchParams("start_date");

  const { data, isLoading } = useTransactionServerQuery<IGainer>(
    dateRange
      ? `${URLs[type]}${buildURLSearchParams(
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
              page: getSearchParams(searchParamKeys?.[type].page),
              page_size: TABLE_ROW_NUM.toString(),
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

export default function GainerLoser({ type }: IGainerLoserProps) {
  const isGainer = type === "gainer";
  const { data, isLoading } = useGainerLoser({ type });
  const { pagination, onChange } = useTable({
    searchParamKeys: searchParamKeys[type],
    page_size: TABLE_ROW_NUM,
  });

  return (
    <div className="flex-1 space-y-6 lap:basis-1/2">
      <div className="flex items-center justify-between">
        <Title level={5} className="capitalize">
          {type}
        </Title>
        <div className="flex items-center gap-x-1.5 text-neutral-13/80 text-sm">
          {isGainer ? "Top Gain:" : "Top Loss:"}
          <Title level={5}>
            {formatCompactNumber(
              isGainer ? data?.total_gain : data?.total_loss
            )}
          </Title>
        </div>
      </div>
      <Table
        loading={isLoading}
        columns={Columns}
        dataSource={data?.results}
        onChange={onChange}
        rowKey="profit_loss"
        rowClassName="h-[4.3125rem]"
        className="h-[28.375rem]"
        scroll={{ y: "24rem" }}
        pagination={{
          ...pagination,
          total: data?.count,
          pageSize: TABLE_ROW_NUM,
        }}
      />
    </div>
  );
}
