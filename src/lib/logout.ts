import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function logout() {
  cookies.remove("access_token");
  cookies.remove("refresh_token");
}
