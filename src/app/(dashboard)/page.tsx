"use client";

import { LandingPage } from "@/constants/strings";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function IndexPage() {
  const { isLoggedIn } = useAuth();
  const { replace } = useRouter();
  useLayoutEffect(() => {
    if (isLoggedIn) {
      replace(LandingPage);
    }
  }, [replace, isLoggedIn]);
  return null;
}
