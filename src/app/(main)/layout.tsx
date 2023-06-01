import "tailwindcss/tailwind.css";
import AppProvider from "@/context/AppProvider";

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="layout" className="opacity-0 transition-opacity">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
