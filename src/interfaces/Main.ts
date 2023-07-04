export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export type TSelectClientParams = Record<"custodianId", string | null>;
export type TSelectCustodianParams = Record<"clientId", string | null>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | null
>;
