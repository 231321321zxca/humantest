import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // 1. これを追加

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GamerBench",
  description: "Test your gaming skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 2. ここにAdSenseコードを追加 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" // ★自分のIDに書き換え
          crossOrigin="anonymous"
          strategy="afterInteractive" // ページの読み込みを邪魔しない設定
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}