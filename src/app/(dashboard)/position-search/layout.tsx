"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { ReactNode } from "react";

interface IPositionLayoutProps {
  children: ReactNode;
}

// Will be making the position list page folder dynamic with [client] after API integration so for now i have just hardcoded the nested route.

export default function PositionLayout({ children }: IPositionLayoutProps) {
  return (
    <div className="space-y-8 px-12 py-6">
      <Breadcrumb
        items={[
          {
            title: <Link href="/position-search">Statement Positions</Link>,
          },
          {
            title: <Link href="/position-search/TTSS">TTSS</Link>,
          },
        ]}
      />
      {children}
    </div>
  );
}
