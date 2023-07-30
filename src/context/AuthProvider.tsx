import { message } from "antd";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useCookies } from "react-cookie";
import { cookieOptions } from "@/constants/cookie";
import { AccessTokenKey, RefreshTokenKey } from "@/constants/strings";
import { useAuthServerMutation } from "@/hooks/useMutation";
import { getExpiryFromToken, getTimeoutFromToken } from "@/lib/token";

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!access_token && refresh_token) {
        refresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [refresh, access_token, refresh_token]);

  const isLoggedIn = Boolean(refresh_token);

  useEffect(() => {
    if (access_token) {
      try {
        const accessTimeout = setTimeout(
          refresh,
          Math.max(getTimeoutFromToken(access_token) - REFRESH_OFFSET, 0) // Offset might cause timeout to be negative
        );
        return () => {
          clearTimeout(accessTimeout);
        };
      } catch {
        // Do nothing
      }
    }
    if (refresh_token) {
      refresh();
    }
    return () => undefined;
  }, [refresh, access_token, refresh_token]);

  useEffect(() => {
    if (refresh_token) {
      try {
        const refreshTimeout = setTimeout(
          () => logout("Session expired. Please login again."),
          getTimeoutFromToken(refresh_token)
        );
        return () => {
          clearTimeout(refreshTimeout);
        };
      } catch (error) {
        logout();
      }
    }
    return () => undefined;
  }, [refresh_token, logout]);

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
