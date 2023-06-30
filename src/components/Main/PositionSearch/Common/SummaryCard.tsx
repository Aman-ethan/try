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
    >
      <h2 className="text-2xl font-medium">{value}</h2>
      <p className="text-md">{type}</p>
    </Card>
  );
}
