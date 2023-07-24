"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

interface IAuthTemplateProps {
  children: ReactNode;
}

export default function AuthTemplate({ children }: IAuthTemplateProps) {
  const { replace } = useRouter();
  const { isLoggedIn } = useAuth();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      replace("/overview");
    } else {
      document.body.classList.remove("opacity-0");
    }
  }, [isLoggedIn, replace]);

  return children;
}
