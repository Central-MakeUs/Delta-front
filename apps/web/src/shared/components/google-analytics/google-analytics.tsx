"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

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

type Platform = "ios" | "android" | "web";

const getPlatform = (): Platform => {
  if (typeof window === "undefined") return "web";
  if (!window.ReactNativeWebView) return "web";

  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "web";
};

type GoogleAnalyticsProps = {
  gaId: string;
};

const GoogleAnalyticsPageView = ({ gaId }: GoogleAnalyticsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (!gaId || typeof window.gtag !== "function") return;

    const url = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    window.gtag("config", gaId, {
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
          gtag('config', '${gaId}');
        `}
      </Script>
      <GoogleAnalyticsPageView gaId={gaId} />
    </>
  );
};

export default GoogleAnalytics;
