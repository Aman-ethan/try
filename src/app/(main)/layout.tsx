import StyleRegistry from "@/components/StyleRegistry";
import "tailwindcss/tailwind.css";
import { Inter } from "next/font/google";
import { ConfigProvider } from "@/lib/antd";
import theme from "@/config/theme";

const inter = Inter({ subsets: ["latin"] });

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyleRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyleRegistry>
      </body>
    </html>
  );
}
