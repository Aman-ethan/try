"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import useSearchParams from "@/hooks/useSearchParams";
import buildURLSearchParams from "@/lib/buildURLSearchParams";

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

function useGainerLoser() {
  const { get: getSearchParams } = useSearchParams();
  const selectedDate = getSearchParams("selected_date");
  const { data, isLoading } = useTransactionServerQuery<IGainerResponse>(
    selectedDate
      ? "/positions/top_gainer/" +
          buildURLSearchParams({
            report_date: selectedDate,
            limit: "5",
            ordering: "",
            offset: "0",
          })
      : null
  );
}

export default function GainerLoser() {
  useGainerLoser();
  return <></>;
}
