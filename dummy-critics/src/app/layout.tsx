"use client";
import { Lato } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={lato.className}>
        {pathname === "/login" || pathname === "/signup" ? <></> : <Header />}
        <div
          className={
            pathname === "/login" || pathname === "/signup" ? "" : "pt-[80px]"
          }
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
