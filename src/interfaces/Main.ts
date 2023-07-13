import { DrawerProps, FormInstance } from "antd";
import { ReactElement } from "react";

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

export type TSelectClientParams = Record<"custodianId", string | undefined>;
export type TSelectCustodianParams = Record<"clientId", string | undefined>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | undefined
>;
