"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatCompactNumber } from "@/lib/format";
import { TableColumnsType } from "antd";
import Table from "../Table";

// interface IGainerResponse {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: {
//     asset_class: string;
//     base_ccy_invested_amount: number | null;
//     base_ccy_realisedpl: number | null;
//     base_ccy_unrealisedpl: number;
//     ccy: string;
//     ccyaccount: string | null;
//     client_ccy_realisedpl: string | null;
//     client_ccy_unrealisedpl: number;
//     client_name: string;
//     company_ccy_realisedpl: string | null;
//     company_ccy_unrealisedpl: number;
//     country: string | null;
//     custodian: string;
//     distributions: string | null;
//     industry: string | null;
//     mtm_base_ccy: number;
//     mtm_client_ccy: number;
//     mtm_company_ccy: number;
//     mtm_price: number;
//     position_qty: string;
//     region: string | null;
//     sec_name: string;
//     security_id: string;
//     total_pl: number;
//   }[];
// }

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

interface IGainerLoserProps {
  path: "top_gainers" | "top_losers";
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
    dataIndex: "security",
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
    dataIndex: "total_pl",
    key: "total-pl",
    width: "18%",
    render: formatCompactNumber,
  },
];

function useGainerLoser() {
  // const { get: getSearchParams } = useSearchParams();
  // const duration = getSearchParams("gain_loss_duration");
  const { data, isLoading } = useTransactionServerQuery<ICombinedGainerLoser>(
    `/position/history/top_gainer_loser${buildURLSearchParams({
      start_date: undefined,
      end_date: undefined,
      client_id: undefined,
      reporting_currency: undefined,
    })}`
  );

  return {
    data,
    isLoading,
  };
}

const scroll = { y: "35.75rem" };

export default function GainerLoser({ path }: IGainerLoserProps) {
  const { data, isLoading } = useGainerLoser();
  return (
    <Table
      loading={isLoading}
      columns={Columns}
      dataSource={data?.result[path]}
      scroll={scroll}
      rowClassName="h-[7rem]"
      className="h-[40.75rem]"
    />
  );
}
