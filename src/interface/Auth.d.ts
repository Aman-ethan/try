interface ILoginArgs {
  username: string;
  password: string;
}

interface ILoginResponse {
  user_id: string;
  phone_number: string;
  message?: string;
}
