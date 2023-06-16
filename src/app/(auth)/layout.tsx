import Logo from "@/components/Auth/Common/Logo";
import { Layout, Sider, Content } from "@/lib/antd";
import Link from "next/link";

import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import AppProvider from "@/context/AppProvider";
import AuthIllustration from "@/components/Auth/Common/AuthIllustration";

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
            <Content className="px-24 pt-16 space-y-12 bg-white">
              <Link href="/login">
                <Logo />
              </Link>
              <div className="flex flex-col max-w-[26.5rem]">{children}</div>
            </Content>
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
