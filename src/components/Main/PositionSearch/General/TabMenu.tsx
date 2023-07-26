"use client";

import { Segmented } from "antd";

const options = [
  "Largest Position First",
  "Smallest Position First",
  "Most Profitable Positions First",
  "Most Loss Making First",
];

export default function TabMenu() {
  return <Segmented block options={options} className="hidden lap:block" />;
}
