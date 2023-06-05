"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

interface ITemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: ITemplateProps) {
  const { replace } = useRouter();
  const { isLoggedIn } = useAuth();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      document.body.classList.remove("opacity-0");
    } else {
      replace("/login");
    }
  }, [isLoggedIn, replace]);

  return children;
}
