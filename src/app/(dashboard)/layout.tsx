import DashboardLayout from "@/components/Main/Layout/DashboardLayout";
import AppProvider from "@/context/AppProvider";

import "@/styles/global.css";
import "antd/dist/reset.css";

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
