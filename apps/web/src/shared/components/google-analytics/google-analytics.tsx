"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { getPlatform } from "@/shared/utils/ga";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
    ReactNativeWebView?: { postMessage: (message: string) => void };
  }
}

type GoogleAnalyticsProps = {
  gaId: string;
};

const GoogleAnalyticsPageView = ({ gaId }: GoogleAnalyticsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || typeof window.gtag !== "function") return;

    const url = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    window.gtag("event", "page_view", {
      page_path: url,
      platform: getPlatform(),
    });
  }, [pathname, searchParams, gaId]);

  return null;
};

const GoogleAnalytics = ({ gaId }: GoogleAnalyticsProps) => {
  if (!gaId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
      <GoogleAnalyticsPageView gaId={gaId} />
    </>
  );
};

export default GoogleAnalytics;
