"use client";

import Title from "@/components/Typography/Title";

interface IFinanceChartProps {
  title: string;
}

export default function FinanceChart({ title }: IFinanceChartProps) {
  return (
    <div className="flex-1">
      <Title>{title}</Title>
      {/* Graph will come here */}
    </div>
  );
}
