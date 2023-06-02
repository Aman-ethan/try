import { useAuthServerMutation } from "@/hooks/useMutation";
import { message } from "antd";
import { createContext, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";

interface ITokenRefreshArgs {
  refresh: string;
}

interface ITokenRefreshResponse {
  access_token: string;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({ isLoggedIn: false });

export default function AuthProvider({ children }: IAuthProviderProps) {
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
      message.error("Failed to fetch the access token.");
    },
  });

  useEffect(() => {
    if (!access_token && refresh_token) {
      trigger({ refresh: refresh_token });
    }
  }, [access_token, refresh_token]);

  const isLoggedIn = Boolean(refresh_token);

  const value = useMemo(
    () => ({
      isLoggedIn,
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
