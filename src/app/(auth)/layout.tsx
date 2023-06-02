import Logo from "@/components/Auth/Common/Logo";
import { Layout, Space, Title, Sider, Content } from "@/lib/antd";
import Link from "next/link";

import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import AppProvider from "@/context/AppProvider";

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
              className="bg-[#2b364e] bg-[url(/AuthCircles.svg)] bg-cover"
            >
              <Link href="/login">
                <Space
                  direction="horizontal"
                  size="middle"
                  className="h-full flex items-center justify-center"
                >
                  <Logo />
                  <Title className="text-white font-normal">ethan</Title>
                </Space>
              </Link>
            </Sider>
            <Content className="h-full flex flex-col justify-center px-8 max-w-xl mx-auto">
              {children}
            </Content>
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
