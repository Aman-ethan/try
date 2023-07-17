import { cookieOptions } from "@/constants/cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/strings";
import { useAuthServerMutation } from "@/hooks/useMutation";
import { message } from "antd";
import { ReactNode, createContext, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";

interface ITokenRefreshArgs {
  refresh: string;
}

interface ITokenRefreshResponse {
  access: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({
  isLoggedIn: false,
});

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [{ access_token, refresh_token }, setCookie] = useCookies([
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
  ]);

  const { trigger } = useAuthServerMutation<
    ITokenRefreshArgs,
    ITokenRefreshResponse
  >("/token/refresh/", {
    onSuccess(data) {
      if (data.access) {
        setCookie(ACCESS_TOKEN_KEY, data.access, {
          ...cookieOptions,
          expires: new Date(Date.now() + 1000 * 60 * 60),
        });
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
  }, [access_token, refresh_token, trigger]);

  const isLoggedIn = Boolean(refresh_token);

  const value = useMemo(
    () => ({
      isLoggedIn,
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
