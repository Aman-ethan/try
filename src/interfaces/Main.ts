import { flags } from "@/constants/flags";
import { DrawerProps, FormInstance } from "antd";
import { ReactElement, ReactNode } from "react";

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

export interface ISelectRelationshipNumberProps {
  placeholder?: string;
  className?: string;
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
  currency: string;
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

type TAuthSearchParams =
  | "username"
  | "password"
  | "phone_number"
  | "user_id"
  | "next_path";

type TStatementSearchParams = "statement_date__gte" | "statement_date__lte";
type TTradeSearchParams = "asset_class" | "security";

export type SearchParams =
  | TAuthSearchParams
  | TStatementSearchParams
  | TTradeSearchParams
  | "page"
  | "ordering"
  | "selected_date"
  | "selected_duration"
  | "goal_id"
  | "estate_id"
  | "bank_account_id"
  | "client"
  | "client_id"
  | "custodian"
  | "custodian_id"
  | "asset_duration"
  | "gain_loss_duration";
export type TUpload = "bulk" | "single";
export type TUploadStatement = "position" | "trade";

export type TSearchParams<T> = Record<"searchParamKeys", T>;
export type TClientParams = TSearchParams<Record<"client", SearchParams>>;
export type TSelectClientParams = Record<"custodianId", string | undefined>;
export type TSelectCustodianParams = Record<"clientId", string | undefined>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | undefined
>;
export type TSelectAssetParams = Record<"assetClass", string | undefined>;
