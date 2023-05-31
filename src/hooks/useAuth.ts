import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function useAuth() {
  const { access_token, refresh_token } = useCookies([
    "access_token",
    "refresh_token",
  ])[0];

  useEffect(() => {
    if (!access_token && refresh_token) {
      // fetch access token
    }
  }, [access_token, refresh_token]);

  return {
    isLoggedIn: !!refresh_token,
  };
}
