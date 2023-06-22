import Logo from "@/components/Common/Icons/Logo";

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
      <body id="layout">
        <main className="p-16 flex flex-col items-center h-full">
          <AppProvider>
            <Logo />
            <section className="flex-1 flex items-center">{children}</section>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
