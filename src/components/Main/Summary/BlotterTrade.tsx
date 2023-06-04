"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import SelectClient from "./SelectClient";
import SelectCustodian from "./SelectCustodian";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";

interface IBlotterTradeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    asset_class: string;
    client_id: number;
    client_name: string;
    currency: string;
    custodian_id: number;
    custodian_name: string;
    meta: null | string;
    realised_pl: number;
    realised_pl_rpt: number;
    security_id: string;
    security_name: string;
    settlement_date: string;
    ticket_ref: null | string;
    trade_action: string;
    trade_date: string;
    trade_id: number;
    trade_price: number;
    trade_qty: string;
  };
}

function useBlotterTrade() {}

export default function BlotterTrade() {
  const { updateSearchParams, getSearchParams } = useSearchParams();
  const {} = useTransactionServerQuery<IBlotterTradeResponse[]>(
    "/trades/?" +
      buildURLSearchParams({
        client_id: getSearchParams("trade_client_id"),
        custodian_id: getSearchParams("trade_custodian_id"),
      })
  );
  return (
    <>
      <SelectClient />
      <SelectCustodian />
    </>
  );
}
