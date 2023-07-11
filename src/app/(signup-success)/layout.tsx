import Logo from "@/components/Icon/Logo";
import AppProvider from "@/context/AppProvider";
import { ReactNode } from "react";
import Link from "next/link";

import "antd/dist/reset.css";
import "@/styles/global.css";

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="layout">
        <main className="flex h-full flex-col items-center p-16">
          <AppProvider>
            <Link href="/login">
              <Logo />
            </Link>
            <section className="flex flex-1 items-center">{children}</section>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
