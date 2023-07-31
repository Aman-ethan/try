import Link from "next/link";
import { ReactNode } from "react";
import AuthIllustration from "@/components/Auth/Icon/AuthIllustration";
import Logo from "@/components/Icon/Logo";
import AppProvider from "@/context/AppProvider";
import { Content, Layout, Sider } from "@/lib/antd";

import "@/styles/global.css";
import "antd/dist/reset.css";
import fontFamily from "@/constants/font";

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontFamily.variable}>
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
            <Content className="max-h-screen space-y-12 overflow-y-scroll bg-neutral-1 px-8 pt-16 tab:px-24">
              <Link href="/login">
                <Logo />
              </Link>
              <div className="max-w-full lap:max-w-[26.5rem]">{children}</div>
            </Content>
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
