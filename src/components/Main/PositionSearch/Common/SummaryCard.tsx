"use client";

import { Card } from "antd";
import { formatCompactNumber, formatPercentage } from "@/lib/format";
import Title from "@/components/Typography/Title";

interface ISummaryCardProps {
  type: string;
  value: number;
}

export default function SummaryCard({ type, value }: ISummaryCardProps) {
  const formattedValue =
    type === "Leverage" ? formatPercentage(value) : formatCompactNumber(value);
  return (
    <Card
      bordered
      bodyStyle={{
        background: "#F3F2F2",
      }}
      className="w-full lap:w-1/3"
    >
      <Title level={4} className="font-medium">
        {formattedValue}
      </Title>
      <p className="tab:text-md text-sm">{type}</p>
    </Card>
  );
}
