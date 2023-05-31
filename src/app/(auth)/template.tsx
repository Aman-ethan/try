"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: IAuthTemplateProps) {
  const { push } = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      push("/dashboard");
    }
  }, [isLoggedIn, push]);

  return !isLoggedIn ? children : null;
}
