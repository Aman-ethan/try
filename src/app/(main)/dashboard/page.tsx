"use client";

import { Button } from "@/lib/antd";
import { useCookies } from "react-cookie";

export default function Home() {
  const removeCookie = useCookies()[2];
  return (
    <Button
      onClick={() => {
        removeCookie("access_token");
        removeCookie("refresh_token");
      }}
    >
      Logout
    </Button>
  );
}
