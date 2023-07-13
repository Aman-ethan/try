"use client";

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
      className="flex-1"
    >
      <h2 className="text-xl font-medium tab:text-2xl">{value}</h2>
      <p className="tab:text-md text-sm">{type}</p>
    </Card>
  );
}
