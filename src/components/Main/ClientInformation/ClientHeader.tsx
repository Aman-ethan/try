"use client";

import { Breadcrumb } from "antd";
import Title from "@/components/Typography/Title";
import { useClientBreadCrumb } from "@/context/ClientContext";
import AddClient from "./AddClient";

export default function ClientHeader() {
  const { breadItems } = useClientBreadCrumb();

  const items = [
    {
      title: "Investor Profile",
    },
    {
      title: breadItems.split("_").join(" "),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb className="capitalize" items={items} />
      <div className="flex flex-col items-start gap-4 tab:flex-row tab:items-center tab:justify-between">
        <Title>Investor Profile</Title>
        <AddClient />
      </div>
    </div>
  );
}
