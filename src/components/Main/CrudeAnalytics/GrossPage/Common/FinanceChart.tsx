"use client";

import AreaChart from "@/components/Main/General/AreaChart";
import Title from "@/components/Typography/Title";
import mockData from "../mockData.json";

interface IFinanceChartProps {
  title: string;
}
export default function FinanceChart({ title }: IFinanceChartProps) {
  return (
    <div className="flex-1">
      <Title>{title}</Title>
      <AreaChart data={mockData} />
    </div>
  );
}
