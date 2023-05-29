import "tailwindcss/tailwind.css";
import { Inter } from "next/font/google";
import Logo from "@/components/Auth/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen antialiased text-base">
          <aside className="flex flex-1 items-center justify-center bg-[#2b364e] bg-[url(/AuthCircles.svg)] bg-cover gap-x-8">
            <Logo />
            <h1 className="text-white text-7xl font-light">ethan</h1>
          </aside>
          <section className="flex flex-col flex-1 justify-center">
            <div className="w-3/4 mx-auto space-y-2 px-8">
              <h2 className="text-4xl text-auth-blue-dark">
                Welcome to <span className="text-[#2b364e]">ethan</span>
              </h2>
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
