export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export type TSelectClientParams = Record<"custodian", string | null>;
export type TSelectCustodianParams = Record<"client", string | null>;
