"use client";

import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";
import SelectClient from "../General/SelectClientWithParams";
import SelectCustodian from "../General/SelectCustodianWithParams";
import TradeRangePicker from "./TradeRangePicker";

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
  }[];
}

function useBlotterTrade() {
  const { get: getSearchParams } = useSearchParams();
  const { isLoading, data, error } = useTransactionServerQuery<
    IBlotterTradeResponse[]
  >(
    `/trades/${buildURLSearchParams({
      limit: "10",
      client_id: getSearchParams("trade_client_id"),
      custodian_id: getSearchParams("trade_custodian_id"),
      trade_date_from: getSearchParams("trade_date_from"),
      trade_date_to: getSearchParams("trade_date_to"),
    })}`
  );
  return {
    isLoading,
    data,
    error,
  };
}

export default function BlotterTrade() {
  useBlotterTrade();
  return (
    <>
      <SelectClient />
      <SelectCustodian />
      <TradeRangePicker />
    </>
  );
}
