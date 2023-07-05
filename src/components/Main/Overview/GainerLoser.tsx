"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { TableColumnsType } from "antd";
import { formatCompactNumber } from "@/lib/format";
import Table from "../Table";

interface IGainerResponse {
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

interface IGainerLoserProps {
  urlKey: string;
}

const Columns: TableColumnsType = [
  {
    title: "Client",
    dataIndex: "client_name",
    key: "client-name",
    width: "15%",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "49%",
  },
  {
    title: "Total PL",
    dataIndex: "total_pl",
    key: "total-pl",
    width: "18%",
    render: formatCompactNumber,
  },
  {
    title: "Net Worth",
    dataIndex: "net_worth",
    key: "net-worth",
    width: "18%",
    render: formatCompactNumber,
  },
];

function useGainerLoser({ urlKey }: IGainerLoserProps) {
  const { get: getSearchParams } = useSearchParams();
  const duration = getSearchParams("gain_loss_duration");
  const { data, isLoading } = useTransactionServerQuery<IGainerResponse>(
    urlKey +
      buildURLSearchParams({
        duration,
        limit: "5",
        offset: "0",
      })
  );
  return {
    data,
    isLoading,
  };
}

const tableClassName = "h-[36rem]";
const scroll = { y: "33rem" };

export default function GainerLoser({ urlKey }: IGainerLoserProps) {
  useGainerLoser({ urlKey });
  return <Table columns={Columns} className={tableClassName} scroll={scroll} />;
}
