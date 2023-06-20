interface ILoginArgs {
  username: string;
  password: string;
}

interface ILoginResponse {
  user_id: number;
  phone_number: string;
  message?: string;
}
