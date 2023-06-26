export interface ILoginArgs {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user_id: number;
  phone_number: string;
  message?: string;
}
