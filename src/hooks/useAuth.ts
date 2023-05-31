import { useCookies } from "react-cookie";

export default function useAuth() {
  const cookies = useCookies(["access_token", "refresh_token"])[0];
  return {
    isLoggedIn: cookies.access_token && cookies.refresh_token,
  };
}
