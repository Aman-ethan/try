"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const { isLoggedIn } = useAuth();
  const { replace } = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      replace("/summary");
    }
  }, []);
  return null;
}
