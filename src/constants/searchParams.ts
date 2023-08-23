import { SearchParams } from "@/interfaces/Main";

const StatementSearchParamKeys: SearchParams[] = [
  "asset_class__in",
  "currency__in",
  "custodian__in",
  "reporting_currency__in",
  "statement_type__in",
  "transaction_type__in",
  "trade_action__in",
  "search",
  "page_size",
];

const BlotterSearchParamKeys: SearchParams[] = [
  "asset_class__in",
  "security__in",
  "trade_action__in",
  "page_size",
  "security__name__in",
];

const GainerLoserSearchParamKeys: SearchParams[] = [
  "client",
  "reporting_currency__in",
];

const resetPage = ["page", "page_gainer", "page_loser"].reduce(
  (acc, key) => ({
    ...acc,
    [key]: undefined,
  }),
  {}
);

export {
  StatementSearchParamKeys,
  BlotterSearchParamKeys,
  GainerLoserSearchParamKeys,
  resetPage,
};
