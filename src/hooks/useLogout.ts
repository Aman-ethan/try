import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/strings";
import { useCookies } from "react-cookie";

export default function useLogout() {
  const removeCookie = useCookies()[2];
  function logout() {
    removeCookie(ACCESS_TOKEN_KEY);
    removeCookie(REFRESH_TOKEN_KEY);
  }
  return logout;
}
