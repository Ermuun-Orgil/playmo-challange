"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { getCookie } from "cookies-next";
import { Header } from "@/components";
import { redirect, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getCookie("user");
  const pathname = usePathname();
  if (!user && !(pathname === "/login" || pathname === "/signup")) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname === "/login" || pathname === "/signup" ? <></> : <Header />}
        <div
          className={
            pathname === "/login" || pathname === "/signup" ? "" : "pt-[80px]"
          }
        >
          {children}
        </div>
      </body>
    </html>
  );
}
