import Logo from "@/components/Auth/Common/Logo";
import theme from "@/config/theme";
import {
  ConfigProvider,
  Layout,
  Space,
  Title,
  Sider,
  Content,
} from "@/lib/antd";
import Link from "next/link";
import StyleRegistry from "@/components/StyleRegistry";

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
        <StyleRegistry>
          <ConfigProvider theme={theme}>
            <Layout hasSider className="h-full">
              <Sider
                width="50%"
                className="bg-[#2b364e] bg-[url(/AuthCircles.svg)] bg-cover"
              >
                <Link href="/dashboard">
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
          </ConfigProvider>
        </StyleRegistry>
      </body>
    </html>
  );
}
