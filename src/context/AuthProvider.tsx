import { cookieOptions } from "@/constants/cookie";
import { AccessTokenKey, RefreshTokenKey } from "@/constants/strings";
import { useAuthServerMutation } from "@/hooks/useMutation";
import { message } from "antd";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
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
  refreshToken: async () => {},
});

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [{ access_token, refresh_token }, setCookie] = useCookies([
    AccessTokenKey,
    RefreshTokenKey,
  ]);

  const { trigger } = useAuthServerMutation<
    ITokenRefreshArgs,
    ITokenRefreshResponse
  >("/token/refresh/", {
    onSuccess(data) {
      if (data.access) {
        setCookie(AccessTokenKey, data.access, {
          ...cookieOptions,
          expires: new Date(Date.now() + 1000 * 60 * 60),
        });
      }
    },
    onError() {
      message.error("Failed to fetch the access token.");
    },
  });

  const refreshToken = useCallback(async () => {
    if (!refresh_token) return;
    await trigger({ refresh: refresh_token });
  }, [trigger, refresh_token]);

  useEffect(() => {
    if (access_token) return;
    refreshToken();
  }, [access_token, refreshToken]);

  const isLoggedIn = Boolean(refresh_token);

  const value = useMemo(
    () => ({
      isLoggedIn,
      refreshToken,
    }),
    [isLoggedIn, refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
