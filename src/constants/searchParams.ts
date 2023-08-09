import { SearchParams } from "@/interfaces/Main";

const StatementSearchParamKeys: SearchParams[] = [
  "asset_class__in",
  "currency__in",
  "custodian__in",
  "reporting_currency__in",
  "statement_date__gte",
  "statement_date__lte",
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
  "statement_date__gte",
  "statement_date__lte",
  "page_size",
];

export { StatementSearchParamKeys, BlotterSearchParamKeys };
