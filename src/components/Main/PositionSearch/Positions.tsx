"use client";

import CompanyCard from "./CompanyCard";
import ClientPositions from "./ClientPositions";

export default function Positions() {
  return (
    <div className="space-y-8">
      <CompanyCard />
      <ClientPositions />
    </div>
  );
}
