import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./header";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevSpot",
  description: "Programa junto a otros expertos en tu tecnologia favorita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader />
          <Toaster/>
          <Header />
          <div className="h-screen dark:bg-black bg-white ">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
