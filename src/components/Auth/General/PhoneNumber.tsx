"use client";

import { Suspense } from "react";
import useSearchParams from "@/hooks/useSearchParams";

export default function PhoneNumber() {
  const searchParams = useSearchParams();
  return (
    <Suspense fallback={null}>
      {searchParams.get("phone_number") || "Phone"}
    </Suspense>
  );
}
