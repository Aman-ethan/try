import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/strings";
import { Cookies } from "react-cookie";

export default function logout() {
  const cookies = new Cookies();
  const options = {
    path: "/",
  };
  cookies.remove(ACCESS_TOKEN_KEY, options);
  cookies.remove(REFRESH_TOKEN_KEY, options);
}
