import Logo from "@/components/Icon/Logo";
import { Layout, Sider, Content } from "@/lib/antd";
import Link from "next/link";
import AppProvider from "@/context/AppProvider";
import AuthIllustration from "@/components/Auth/Icon/AuthIllustration";

import "antd/dist/reset.css";
import "@/styles/global.css";
import { ReactNode } from "react";

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="layout" className="opacity-0 transition-opacity">
        <AppProvider>
          <Layout suppressHydrationWarning hasSider className="h-full">
            <Sider
              width="50%"
              className="hidden lap:block lap:bg-primary-10 lap:bg-[url(/AuthBackground.svg)] lap:bg-cover"
            >
              <div className="flex h-full items-center justify-center">
                <AuthIllustration />
              </div>
            </Sider>
            <Content className="max-h-screen space-y-12 overflow-y-scroll bg-neutral-1 px-24 pt-16">
              <Link href="/login">
                <Logo />
              </Link>
              <div className="max-w-[26.5rem]">{children}</div>
            </Content>
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
