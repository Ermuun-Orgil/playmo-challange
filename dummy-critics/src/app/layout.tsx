"use client";
import { Lato } from "next/font/google";
import "../styles/globals.css";
import { getCookie } from "cookies-next";
import { Header } from "@/components";
import { redirect, usePathname } from "next/navigation";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getCookie("user");
  const pathname = usePathname();
  // if (
  //   !getCookie("user") &&
  //   !(pathname === "/login" || pathname === "/signup")
  // ) {
  //   redirect("/login");
  // }
  return (
    <html lang="en">
      <body className={lato.className}>
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
