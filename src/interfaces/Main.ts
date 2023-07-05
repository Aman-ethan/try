export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export type TSelectClientParams = Record<"custodianId", string | undefined>;
export type TSelectCustodianParams = Record<"clientId", string | undefined>;
export type TBankAccountParams = Record<
  "clientId" | "custodianId",
  string | undefined
>;
