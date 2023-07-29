"use client";

import { formatCompactNumber } from "@/lib/format";
import { Card } from "antd";

interface ISummaryCardProps {
  type: string;
  value: number;
}

export default function SummaryCard({ type, value }: ISummaryCardProps) {
  return (
    <Card
      bordered
      bodyStyle={{
        background: "#F3F2F2",
      }}
      className="w-full lap:w-1/3"
    >
      <h2 className="text-xl font-medium tab:text-2xl">
        {formatCompactNumber(value)}
      </h2>
      <p className="tab:text-md text-sm">{type}</p>
    </Card>
  );
}
