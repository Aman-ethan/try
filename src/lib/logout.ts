import { cookieOptions } from "@/constants/cookie";
import { AccessTokenKey, RefreshTokenKey } from "@/constants/strings";
import { Cookies } from "react-cookie";

export default function logout() {
  const cookies = new Cookies();
  cookies.remove(RefreshTokenKey, cookieOptions);
  cookies.remove(AccessTokenKey, cookieOptions);
}
