import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAuthServerMutation } from "./useMutation";
import { message } from "antd";

interface ITokenRefreshArgs {
  refresh: string;
}

interface ITokenRefreshResponse {
  access_token: string;
}

export default function useAuth() {
  const [{ access_token, refresh_token }, setCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);

  const { trigger } = useAuthServerMutation<
    ITokenRefreshArgs,
    ITokenRefreshResponse
  >("/api/token/refresh/", {
    onSuccess(data) {
      if (data.access_token) {
        setCookie("access_token", data.access_token);
      }
    },
    onError() {
      message.error("Failed to refresh the access token.");
    },
  });

  useEffect(() => {
    if (!access_token && refresh_token) {
      trigger({ refresh: refresh_token });
    }
  }, [access_token, refresh_token]);

  return {
    isLoggedIn: Boolean(refresh_token),
  };
}
