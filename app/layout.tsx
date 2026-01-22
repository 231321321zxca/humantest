import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Script from "next/script"; // ← 一旦コメントアウト

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
        {/* ★ AdSense審査用: Next.jsの機能を使わず直接書く */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7283737754158866"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}