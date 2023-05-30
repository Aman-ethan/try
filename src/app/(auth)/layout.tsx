"use client";

import Logo from "@/components/Auth/Logo";
import theme from "@/config/theme";
import { ConfigProvider, Layout, Space, Typography } from "antd";

import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConfigProvider theme={theme}>
          <Layout className="h-full">
            <Layout.Sider
              width="50%"
              className="bg-[#2b364e] bg-[url(/AuthCircles.svg)] bg-cover"
            >
              <Space
                direction="horizontal"
                size="middle"
                className="h-full flex items-center justify-center"
              >
                <Logo />
                <Typography.Title className="text-white font-normal">
                  ethan
                </Typography.Title>
              </Space>
            </Layout.Sider>
            <Layout.Content className="h-full flex flex-col justify-center px-8 max-w-xl mx-auto">
              <Typography.Title className="font-normal">
                Welcome to <span className="text-auth-blue-dark">ethan</span>
              </Typography.Title>
              {children}
            </Layout.Content>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
