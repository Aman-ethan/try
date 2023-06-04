"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

interface IAuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: IAuthTemplateProps) {
  const { replace } = useRouter();
  const { isLoggedIn } = useAuth();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      replace("/summary");
    } else {
      document.body.classList.remove("opacity-0");
    }
  }, [isLoggedIn, replace]);

  return children;
}
