// components/AdBanner.tsx
"use client";

import { useEffect } from "react";

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
};

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // 広告をロードする処理
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err: any) {
      console.error("AdSense error:", err.message);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-8 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "300px" }} // 最低幅を指定
        data-ad-client="ca-pub-0000000000000000" // ★ここも自分のIDに書き換え
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      ></ins>
    </div>
  );
}