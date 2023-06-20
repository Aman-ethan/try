"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

interface ITemplateProps {
  children: ReactNode;
}

export default function Template({ children }: ITemplateProps) {
  const { replace } = useRouter();
  const { isLoggedIn } = useAuth();

  useLayoutEffect(() => {
    // if (isLoggedIn) {
    //   document.body.classList.remove("opacity-0");
    // } else {
    //   replace("/login");
    // }
  }, [isLoggedIn, replace]);

  return children;
}
