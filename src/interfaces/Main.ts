import { DrawerProps, FormInstance } from "antd";
import { ReactElement, ReactNode } from "react";
import { ManipulateType, QUnitType } from "dayjs";
import { flags } from "@/constants/flags";

export interface ILayoutProps {
  children: ReactNode;
}

export interface ITemplateProps {
  children: ReactNode;
}

export type TCurrency = keyof typeof flags;

export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export interface IDateRange {
  start_date: string;
  end_date: string;
}

export interface IIndexData {
  x: string;
  y: number;
  z: string;
}

export interface IAssetNetWorth {
  title: string;
  x_label: string;
  y_label: string;
  data: IIndexData[];
}

export interface IPieData {
  type: string;
  value: number;
}

export interface IGrossAllocation {
  title: string;
  x_label: string;
  y_label: string;
  data: IPieData[];
}

export interface IBankStatement {
  id: string;
  client_name: string;
  custodian_name: string;
  statement_date: string;
  upload_date: string;
  status: string;
  reporting_currency: string;
  relationship_number: string;
  portfolio_number: string;
  s3_url: string;
}

export interface IBankAccount {
  relationship_number: string;
  portfolio_number: string;
  account_number: string;
  account_type: string;
  currency: TCurrency;
  custodian: string;
  custodian_name: string;
}

export interface IFormProps {
  form: FormInstance;
  isMutating: boolean;
  initialValues?: Record<string, string>;
  trigger: (_values: Record<string, string>) => void;
}

export interface ISecurity {
  name: string;
  symbol: string;
  isin: string;
  exchange: string;
  sub_asset_class: string;
  country_name: string;
  currency_code: string;
  market_close: string;
  meta?: {
    tags?: string[];
    private: boolean;
  };
}

export interface ISecuritySearchProps {
  name: string;
  code: string;
  exchange: string;
  type: string;
  country: string;
  currency: string;
  isin: string;
  previous_close: string;
}
export interface IPaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface IStatementFormProps {
  id: string;
}
export interface IDrawerProps extends DrawerProps {
  button?: ReactElement;
  closeButton?: string;
}

export interface IBlotterTransactionStatement {
  id: string;
  trade_action: string;
  security: string;
  asset_class: string;
  custodian_name: string;
  relationship_number: string;
  trade_date: string;
  settlement_date: string;
  quantity: number;
  cost_price: number;
  mtm_price: number;
  realised_pl: number;
  currency: TCurrency;
  goal: string;
  meta: { tags: string[] };
}

export interface IFormDrawerProps {
  id?: string;
  message?: {
    success: string;
    error: string;
  };
  formComponent: (_props: IFormProps) => ReactNode;
  drawerProps: IDrawerProps;
}

export interface IPositionsData {
  id: string;
  custodian_name: string;
  client_name: string;
  security_name: string;
  isin: string;
  quantity: number;
  average_price: number;
  currency: TCurrency;
  mtm_price: number;
  asset_class: string;
  unrealised_pl: number;
  client: string;
  custodian: string;
  security: string;
  relationship_number: string;
  market_value: number;
  description: string;
}

export interface IPositionsResponse {
  count: number;
  next: string;
  previous: string;
  results: IPositionsData[];
}

export interface IPositionNetWorth {
  client_id: string;
  client_name: string;
  assets: number;
  liabilities: number;
  networth: number;
  currency: TCurrency;
}
export interface IPositionSearchResponse {
  client_cards: IPositionNetWorth[];
  company_card: IPositionNetWorth;
}

// These fields will change according to data, for now the values and types are placeholders
export interface IBalanceSheetChart {
  key: string;
  asset_class: string;
  total_value: number;
  percentage: number;
}

export interface IBalanceSheetOverview {
  asset: IBalanceSheetChart[];
  liability: IBalanceSheetChart[];
  reporting_currency: TCurrency;
}

export interface IMonthPicker {
  start_date: string;
  end_date: string;
}

export type TProgressType = "success" | "failure";

export type TDurationValue = ManipulateType | QUnitType;

export interface ICurrency {
  code?: string;
  name: string;
  numeric_code: string;
}

export interface IAssetClass {
  sub_asset_class: string;
}

export interface IClient {
  client_id: number;
  client_name: string;
  networth: number;
  total_change: number;
  daily_change: number;
}

export type TGainerLoser = "gainer" | "loser";

type TCommonSearchPrams =
  | "page"
  | "page_size"
  | "ordering"
  | "client"
  | "client_id"
  | "report_date";

type TAuthSearchParams =
  | "username"
  | "password"
  | "phone_number"
  | "user_id"
  | "next_path";

type TStatementSearchParams =
  | "statement_date__gte"
  | "statement_date__lte"
  | "reporting_currency__in"
  | "statement_type__in"
  | "transaction_type__in"
  | "custodian__in"
  | "currency__in";

type TTradeSearchParams =
  | "asset_class__in"
  | "security__in"
  | "trade_action__in";

type TOverviewSearchParams =
  | "start_date"
  | "end_date"
  | "asset_client"
  | "gross_allocation_client"
  | "page_gainer"
  | "page_loser";

export type SearchParams =
  | TCommonSearchPrams
  | TAuthSearchParams
  | TStatementSearchParams
  | TTradeSearchParams
  | TOverviewSearchParams
  | "selected_date"
  | "selected_duration"
  | "goal_id"
  | "estate_id"
  | "bank_account_id"
  | "client"
  | "client_id"
  | "custodian"
  | "custodian_id"
  | "relationship_number"
  | "search"
  | "asset_duration"
  | "security_id"
  | "asset_class"
  | "gain_loss_duration";

export interface IUseTableParams {
  searchParamKeys?: {
    client?: SearchParams;
    page?: SearchParams;
  };
  pageSize?: number;
}

export type TTabType = "goal" | "estate" | "bank_account";
export type TUpload = "bulk" | "single";
export type TUploadStatement = "position" | "trade";

export type TSearchParams<T> = Record<"searchParamKeys", T>;
export type TClientParams = TSearchParams<Record<"client", SearchParams>>;
export type TSelectClientParams = Record<"custodianId", string | undefined>;
export type TCustodianParams = Record<"clientId", string | undefined>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | undefined
>;
export type TSelectAssetParams = Record<"assetClass", string | undefined>;
