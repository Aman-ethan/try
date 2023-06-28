export interface ICustodian {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodian[];
}

export interface IUploadStatementForm {
  client_id: string;
  custodian_id: string;
  file: File;
}

export type TSelectClientParams = Record<"custodian_id", string | null>;
export type TSelectCustodianParams = Record<"client_id", string | null>;
