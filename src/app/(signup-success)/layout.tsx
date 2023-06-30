import Logo from "@/components/Icon/Logo";
import AppProvider from "@/context/AppProvider";

import "antd/dist/reset.css";
import "@/styles/global.css";
import { ReactNode } from "react";

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="layout">
        <main className="flex h-full flex-col items-center p-16">
          <AppProvider>
            <Logo />
            <section className="flex flex-1 items-center">{children}</section>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
