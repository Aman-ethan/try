"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: IAuthTemplateProps) {
  const { replace } = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      replace("/dashboard");
    } else {
      document.body.classList.remove("opacity-0");
    }
  }, [isLoggedIn, replace]);

  return children;
}
