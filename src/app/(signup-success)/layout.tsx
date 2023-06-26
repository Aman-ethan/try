import Logo from "@/components/Icon/Logo";
import AppProvider from "@/context/AppProvider";

import "antd/dist/reset.css";
import "@/styles/global.css";

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="layout">
        <main className="p-16 flex flex-col items-center h-full">
          <AppProvider>
            <Logo />
            <section className="flex-1 flex items-center">{children}</section>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
