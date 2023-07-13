import { flags } from "@/constants/flags";
import { DrawerProps, FormInstance } from "antd";
import { ReactElement } from "react";

type AuthSearchParams =
  | "username"
  | "password"
  | "phone_number"
  | "user_id"
  | "next_path";

type StatementSearchParams =
  | "page"
  | "statement_date__gte"
  | "statement_date__lte"
  | "ordering";

export type SearchParams =
  | AuthSearchParams
  | StatementSearchParams
  | "selected_date"
  | "selected_duration"
  | "goal_id"
  | "estate_id"
  | "bank_account_id"
  | "client"
  | "client_id"
  | "custodian"
  | "asset_duration"
  | "gain_loss_duration";

export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export interface IStatementForm {
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

export interface ITradeFormProps extends IStatementForm {}

export type TCurrency = keyof typeof flags;

export type TUpload = "bulk" | "single";

export interface ISelectRelationshipNumberProps {
  placeholder?: string;
  className?: string;
}

export interface IStatementFormProps {
  id: string;
}
export interface IDrawerProps
  extends Pick<DrawerProps, "children" | "footer" | "title" | "width"> {
  button: ReactElement;
}

export type TUploadStatement = "position" | "trade";
export type TCurrency = keyof typeof flags;

export type TSelectClientParams = Record<"custodianId", string | undefined>;
export type TSelectCustodianParams = Record<"clientId", string | undefined>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | undefined
>;
export type TSelectAssetParams = Record<"assetClass", string | undefined>;
