import Logo from "@/components/Common/Icons/Logo";
import { Layout, Sider, Content } from "@/lib/antd";
import Link from "next/link";

import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import AppProvider from "@/context/AppProvider";
import AuthIllustration from "@/components/Auth/Icon/AuthIllustration";

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="layout" className="opacity-0 transition-opacity">
        <AppProvider>
          <Layout hasSider className="h-full">
            <Sider
              width="50%"
              className="bg-primary-10 bg-[url(/AuthBackground.svg)] bg-cover"
            >
              <div className="h-full flex justify-center items-center">
                <AuthIllustration />
              </div>
            </Sider>
            <Content className="px-24 pt-16 space-y-12 bg-neutral-1 max-h-screen overflow-y-scroll">
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
