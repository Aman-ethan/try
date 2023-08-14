"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";

import PositionList from "@/components/Main/PositionSearch/PositionList";

const BreadcrumbItems = [
  {
    title: <Link href="/position-search">Position Search</Link>,
  },
  {
    title: "Balance Sheet",
  },
];

export default function PositionListPage() {
  return (
    <>
      <Breadcrumb items={BreadcrumbItems} />
      <PositionList />;
    </>
  );
}
