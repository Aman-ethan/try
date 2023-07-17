import { cookieOptions } from "@/constants/cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/strings";
import { Cookies } from "react-cookie";

export default function logout() {
  const cookies = new Cookies();
  cookies.remove(REFRESH_TOKEN_KEY, cookieOptions);
  cookies.remove(ACCESS_TOKEN_KEY, cookieOptions);
}
