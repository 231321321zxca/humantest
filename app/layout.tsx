import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ★ これが必要です

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GamerBench",
  description: "Test your gaming skills including reaction time, aim, and typing speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ★ Google AdSense Code */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7283737754158866"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}