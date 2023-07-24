import { cookieOptions } from "@/constants/cookie";
import { AccessTokenKey, RefreshTokenKey } from "@/constants/strings";
import { useAuthServerMutation } from "@/hooks/useMutation";
import { getExpiryFromToken, getTimeoutFromToken } from "@/lib/token";
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

const REFRESH_OFFSET = 5 * 60 * 1000;

export const AuthContext = createContext({
  isLoggedIn: false,
  refresh: async () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [{ access_token, refresh_token }, setCookie, removeCookie] = useCookies(
    [AccessTokenKey, RefreshTokenKey]
  );

  const { trigger } = useAuthServerMutation<
    ITokenRefreshArgs,
    ITokenRefreshResponse
  >("/token/refresh/", {
    onSuccess(data) {
      const accessToken = data.access;
      if (accessToken) {
        setCookie(AccessTokenKey, accessToken, {
          ...cookieOptions,
          expires: getExpiryFromToken(accessToken),
        });
      }
    },
    onError() {
      message.error("Failed to fetch the access token.");
    },
  });

  const refresh = useCallback(async () => {
    await trigger({ refresh: refresh_token });
  }, [trigger, refresh_token]);

  const logout = useCallback(
    (msg?: string) => {
      removeCookie(RefreshTokenKey, cookieOptions);
      removeCookie(AccessTokenKey, cookieOptions);
      if (msg) {
        message.info(msg);
      }
    },
    [removeCookie]
  );

  const isLoggedIn = Boolean(refresh_token);

  useEffect(() => {
    if (access_token) {
      const accessTimeout = setTimeout(
        refresh,
        Math.max(getTimeoutFromToken(access_token) - REFRESH_OFFSET, 0) // Offset might cause timeout to be negative
      );
      const refreshTimeout = setTimeout(
        () => logout("Session expired. Please login again."),
        getTimeoutFromToken(refresh_token)
      );
      return () => {
        clearTimeout(accessTimeout);
        clearTimeout(refreshTimeout);
      };
    }
    if (refresh_token) {
      refresh();
    }
    return () => undefined;
  }, [refresh, logout, access_token, refresh_token]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      refresh,
      logout,
    }),
    [isLoggedIn, refresh, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
