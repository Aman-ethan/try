import { ReactNode } from "react";
import DashboardLayout from "@/components/Main/Layout/DashboardLayout";
import AppProvider from "@/context/AppProvider";

import "antd/dist/reset.css";
import "@/styles/global.css";

export default function MainRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="layout" className="opacity-0 transition-opacity">
        <AppProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
      </body>
    </html>
  );
}
