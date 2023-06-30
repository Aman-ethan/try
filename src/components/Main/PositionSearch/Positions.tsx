"use client";

import CompanyCard from "./CompanyCard";
import ClientPositions from "./ClientPositions";

export default function Positions() {
  return (
    <div className="space-y-8 p-10">
      <CompanyCard />
      <ClientPositions />
    </div>
  );
}
