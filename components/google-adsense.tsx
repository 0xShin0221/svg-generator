"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "vertical" | "rectangle" | "auto";
  className?: string;
}

export default function AdBanner({
  slot = "xxxxxxxxxx", // デフォルトのスロットID
  format = "auto",
  className = "",
}: AdBannerProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // クライアントサイドのみで実行
  useEffect(() => {
    setIsClient(true);

    // モバイル判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // フォーマットに基づいたクラス
  const formatClasses = {
    horizontal: "w-full h-[90px] md:h-[90px]",
    vertical: "w-[160px] h-[600px]",
    rectangle: "w-[300px] h-[250px]",
    auto: "w-full min-h-[250px]",
  };

  // モバイル用の追加スタイル
  const mobileClass = isMobile ? "w-full min-h-[100px]" : "";

  return (
    <div className={`mx-auto ${className}`}>
      <div
        className={`
          ad-banner-container 
          overflow-hidden 
          rounded-lg 
          border-2 
          border-blue-400/30 
          bg-gradient-to-br 
          from-blue-950/80 
          to-purple-950/80 
          shadow-md 
          shadow-blue-500/10
          backdrop-blur-sm
          relative
          flex
          justify-center
          items-center
          
          ${formatClasses[format]}
          ${mobileClass}
        `}
      >
        {/* AdSense広告が読み込まれる前または無効時のフォールバック */}
        <div className="absolute top-2 right-2 text-xs text-blue-300 font-medium px-2 py-0.5 bg-blue-900/50 rounded-full">
          広告 Google AdSense
        </div>

        {isClient ? (
          <div className="w-full h-full flex justify-center items-center">
            {/* Google AdSense広告コード */}
            <ins
              className="adsbygoogle w-full h-full block"
              style={{ display: "block" }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // あなたのAdSenseパブリッシャーID
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({});
                `,
              }}
            />
          </div>
        ) : (
          // SSRレンダリング時のプレースホルダー
          <div className="text-center text-blue-300/70 text-sm">
            広告コンテンツがここに表示されます
          </div>
        )}
      </div>
    </div>
  );
}
