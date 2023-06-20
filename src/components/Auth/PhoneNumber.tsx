"use client";

import useSearchParams from "@/hooks/useSearchParams";
import { Suspense } from "react";

export default function PhoneNumber() {
  const searchParams = useSearchParams();
  return (
    <Suspense fallback={null}>
      {searchParams.get("phone_number") || "Phone"}
    </Suspense>
  );
}
