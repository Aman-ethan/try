import { DrawerProps } from "antd";

export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export interface IDrawerProps
  extends Pick<DrawerProps, "children" | "footer" | "title" | "width"> {
  buttonText: string;
}

export type TSelectClientParams = Record<"custodianId", string | undefined>;
export type TSelectCustodianParams = Record<"clientId", string | undefined>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | undefined
>;
