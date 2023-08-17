"use client";

import { Card } from "antd";
import { formatPercentage } from "@/lib/format";
import Title from "@/components/Typography/Title";
import TooltipText from "@/components/Typography/ToolTipText";

interface ISummaryCardProps {
  type: "net_worth" | "leverage";
  value: number;
}

export default function SummaryCard({ type, value }: ISummaryCardProps) {
  const formattedValue =
    type === "leverage" ? (
      formatPercentage(value)
    ) : (
      <TooltipText value={value} />
    );
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
      <p className="tab:text-md text-sm capitalize">
        {type.split("_").join(" ")}
      </p>
    </Card>
  );
}
