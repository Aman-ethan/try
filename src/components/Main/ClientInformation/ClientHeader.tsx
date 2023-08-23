"use client";

import Title from "@/components/Typography/Title";
import { HeaderClassName } from "@/constants/strings";
import AddClient from "./AddClient";

export default function ClientHeader() {
  return (
    <div className="space-y-4 tab:space-y-6 ">
      <div className="flex flex-col items-start gap-4 tab:flex-row tab:items-center tab:justify-between">
        <Title className={HeaderClassName}>Investor Profile</Title>
        <AddClient />
      </div>
    </div>
  );
}
