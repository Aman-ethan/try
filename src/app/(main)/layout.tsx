import "tailwindcss/tailwind.css";
import { Inter } from "next/font/google";
import AppProvider from "@/context/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
