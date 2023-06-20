import AppProvider from "@/context/AppProvider";

import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import Layout from "@/components/Main/Common/DashboardLayout";

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="layout" className="">
        <AppProvider>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
