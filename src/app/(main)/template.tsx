"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ITemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: ITemplateProps) {
  const { push } = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      push("/login");
    }
  }, [isLoggedIn, push]);

  return isLoggedIn ? children : null;
}
