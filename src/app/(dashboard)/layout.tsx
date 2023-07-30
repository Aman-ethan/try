import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import DashboardLayout from "@/components/Main/Layout/DashboardLayout";
import AppProvider from "@/context/AppProvider";

import "antd/dist/reset.css";
import "@/styles/global.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function MainRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body id="layout" className="opacity-0 transition-opacity">
        <AppProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
      </body>
    </html>
  );
}
