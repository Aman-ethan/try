interface ILoginArgs {
  username: string;
  password: string;
}

interface ILoginResponse {
  user_id: string;
  message?: string;
}
