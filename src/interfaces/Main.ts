export interface ICustodianResponse {
  id: string;
  name: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  custodians: ICustodianResponse[];
}

export interface ISelectClientProps {
  placeholder?: string;
  className?: string;
}

export interface ISelectCustodianProps {
  placeholder?: string;
  className?: string;
}

export interface IStatementFormProps {
  id: string;
}
